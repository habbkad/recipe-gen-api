exports.formatResponse = (req, res, next) => {
    res.formatResponse = (data) => {
        const response = {
            id: data.id || "unique-recipe-id",
            title: data.title || "Recipe Name",
            description: data.description || "Brief description",
            ingredients: data.ingredients || [],
            instructions: data.instructions || [],
            cookingTime: data.cookingTime || "30 minutes",
            difficulty: data.difficulty || "easy",
            servings: data.servings || 4,
            cuisine: data.cuisine || "cuisine type",
            dietaryInfo: {
                vegetarian: data.dietaryInfo?.vegetarian || false,
                vegan: data.dietaryInfo?.vegan || false,
                glutenFree: data.dietaryInfo?.glutenFree || false,
                dairyFree: data.dietaryInfo?.dairyFree || false
            },
            nutrition: {
                calories: data.nutrition?.calories || 0,
                protein: data.nutrition?.protein || "amount",
                carbs: data.nutrition?.carbs || "amount",
                fat: data.nutrition?.fat || "amount"
            }
        };
        res.json(response);
    };
    next();
};