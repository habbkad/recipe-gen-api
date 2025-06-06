const express = require("express");
const { createRecipe, getRecipe } = require("../controllers/recipeController");

const router = express.Router();

router.post("/generate", createRecipe);
router.get("/:id", getRecipe);

module.exports = () => router;
