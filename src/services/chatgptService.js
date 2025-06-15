const { OpenAI } = require("openai");
const { log } = require("winston");
require("dotenv").config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

exports.generateRecipe = async (preferences) => {
  const prompt = createPrompt(preferences);
  const response = await callChatGPT(prompt);
  const formattedResponse = formatJson(response);
  return formattedResponse;
};

const createPrompt = (preferences) => {
  return `Generate at least 3 and at most 5 recipes based on the following preferences: 
Ingredients: ${preferences.ingredients.join(", ")}, 
Dietary Restrictions: ${preferences.dietaryRestrictions.join(", ")}, 
Cuisine Type: ${preferences.cuisineType}, 
Cooking Time: ${preferences.cookingTime}, 
Difficulty Level: ${preferences.difficultyLevel}, 
Serving Size: ${preferences.servingSize}.

Respond ONLY with a valid JSON array containing 4 to 5 recipes objects and NO extra text or formatting. 

Each recipe object must contain the following fields:
- title (string)
- description (string)
- ingredients (array of strings)
- instructions (array of strings)
- cookingTime (string or number)
- difficulty (string)
- servings (number)
- cuisine (string)
- dietaryInfo (array of strings)
- nutrition (object with keys like calories, protein, etc.)
- food_image_url (a direct image URL of the food that visually matches the recipe)
- id (a unique string or number)
- tag (array of keywords)

The **food_image_url** must be a relevant, high-quality image of the specific recipe title.`;
};

const callChatGPT = async (prompt) => {
  const response = await openai.chat.completions.create({
    model: "gpt-4.1", // or 'gpt-3.5-turbo'
    messages: [{ role: "user", content: prompt }],
  });

  return response;
};

const formatResponse = (data) => {
  // Assuming the response from ChatGPT contains the recipe in a specific format
  return {
    id: generateUniqueId(),
    title: data.title,
    description: data.description,
    ingredients: data.ingredients,
    instructions: data.instructions,
    cookingTime: data.cookingTime,
    difficulty: data.difficulty,
    servings: data.servings,
    cuisine: data.cuisine,
    dietaryInfo: data.dietaryInfo,
    nutrition: data.nutrition,
  };
};

const generateUniqueId = () => {
  return "recipe-" + Math.random().toString(36).substr(2, 9);
};

const formatJson = (response) => {
  const responseText = response.choices[0].message.content;

  // Try to extract JSON array or object from the response
  const jsonMatch = responseText.match(/(\[.*\]|\{[\s\S]*\})/s);
  let recipes;
  if (jsonMatch) {
    try {
      recipes = JSON.parse(jsonMatch[0]);
    } catch (e) {
      recipes = null; // Handle error
    }
  } else {
    recipes = null; // No JSON found
  }

  return recipes;
};
