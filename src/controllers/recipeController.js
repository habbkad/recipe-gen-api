const { log } = require("winston");
const { generateRecipe } = require("../services/chatGPTService");

exports.createRecipe = async (req, res, next) => {
  console.log("Received request to create a recipe with body:", req.body);

  try {
    const {
      ingredients,
      dietaryRestrictions,
      cuisine,
      cookingTime,
      difficulty,
      servings,
      mealType,
    } = req.body;

    const recipe = await generateRecipe({
      ingredients,
      dietaryRestrictions,
      cuisine,
      cookingTime,
      difficulty,
      servings,
      mealType,
    });

    res.status(201).json(recipe);
  } catch (error) {
    next(error);
  }
};

exports.getRecipe = async (req, res, next) => {
  try {
    const recipeId = req.params.id;

    // Logic to retrieve a recipe by ID can be added here if a database is integrated
    res
      .status(200)
      .json({ message: "Recipe retrieval logic not implemented yet." });
  } catch (error) {
    next(error);
  }
};
