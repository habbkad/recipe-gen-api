# Recipe Generation API

## Overview
The Recipe Generation API is a Node.js application that allows users to generate personalized recipes based on their preferences. It integrates with OpenAI's ChatGPT API to provide tailored recipe suggestions based on various input parameters such as ingredients, dietary restrictions, cuisine type, cooking time, difficulty level, and serving size.

## Features
- Accepts user input for recipe preferences.
- Generates recipes using the ChatGPT API.
- Returns structured JSON responses with detailed recipe information.
- Implements error handling, rate limiting, and secure API key management.

## Folder Structure
```
recipe-gen-api
├── src
│   ├── app.js
│   ├── server.js
│   ├── controllers
│   │   └── recipeController.js
│   ├── routes
│   │   └── recipeRoutes.js
│   ├── services
│   │   └── chatgptService.js
│   ├── middleware
│   │   ├── validateInput.js
│   │   ├── formatResponse.js
│   │   ├── errorHandler.js
│   │   └── rateLimiter.js
│   ├── utils
│   │   └── logger.js
│   ├── config
│   │   └── env.js
│   └── models
│       └── recipe.js
├── .env
├── package.json
├── README.md
└── .gitignore
```

## Installation
1. Clone the repository:
   ```
   git clone https://github.com/yourusername/recipe-gen-api.git
   ```
2. Navigate to the project directory:
   ```
   cd recipe-gen-api
   ```
3. Install the dependencies:
   ```
   npm install
   ```
4. Create a `.env` file in the root directory and add your API keys and other environment variables.

## Usage
1. Start the server:
   ```
   npm start
   ```
2. Send a POST request to the `/api/recipes` endpoint with the following JSON body:
   ```json
   {
     "ingredients": ["chicken", "rice"],
     "dietaryRestrictions": ["glutenFree"],
     "cuisine": "Italian",
     "cookingTime": "30 minutes",
     "difficulty": "easy",
     "servings": 4,
     "mealType": "dinner"
   }
   ```

## Example Response
```json
{
  "id": "unique-recipe-id",
  "title": "Chicken and Rice",
  "description": "A simple and delicious chicken and rice recipe.",
  "ingredients": [
    {
      "name": "chicken",
      "amount": "500",
      "unit": "grams"
    },
    {
      "name": "rice",
      "amount": "200",
      "unit": "grams"
    }
  ],
  "instructions": ["Cook the chicken.", "Boil the rice.", "Combine and serve."],
  "cookingTime": "30 minutes",
  "difficulty": "easy",
  "servings": 4,
  "cuisine": "Italian",
  "dietaryInfo": {
    "vegetarian": false,
    "vegan": false,
    "glutenFree": true,
    "dairyFree": true
  },
  "nutrition": {
    "calories": 600,
    "protein": "40 grams",
    "carbs": "50 grams",
    "fat": "20 grams"
  }
}
```

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License
This project is licensed under the MIT License.