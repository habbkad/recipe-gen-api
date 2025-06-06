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
        Serving Size: ${
          preferences.servingSize
        }.Respond ONLY with a valid JSON object for the recipe, no extra text or formatting. The fields should be: title, description, ingredients (array), instructions (array), cookingTime, difficulty, servings, cuisine, dietaryInfo, nutrition,food image url.`;
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
