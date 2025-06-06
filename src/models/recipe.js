class Recipe {
    constructor(id, title, description, ingredients, instructions, cookingTime, difficulty, servings, cuisine, dietaryInfo, nutrition) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.ingredients = ingredients;
        this.instructions = instructions;
        this.cookingTime = cookingTime;
        this.difficulty = difficulty;
        this.servings = servings;
        this.cuisine = cuisine;
        this.dietaryInfo = dietaryInfo;
        this.nutrition = nutrition;
    }
}

export default Recipe;