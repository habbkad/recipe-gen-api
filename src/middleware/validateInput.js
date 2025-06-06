const { body, validationResult } = require('express-validator');

const validateInput = [
  body('ingredients')
    .isArray()
    .withMessage('Ingredients must be an array')
    .notEmpty()
    .withMessage('Ingredients cannot be empty'),
  body('dietaryRestrictions')
    .optional()
    .isArray()
    .withMessage('Dietary restrictions must be an array'),
  body('cuisineType')
    .optional()
    .isString()
    .withMessage('Cuisine type must be a string'),
  body('cookingTime')
    .optional()
    .isString()
    .withMessage('Cooking time must be a string'),
  body('difficultyLevel')
    .optional()
    .isIn(['easy', 'medium', 'hard'])
    .withMessage('Difficulty level must be one of: easy, medium, hard'),
  body('servingSize')
    .isInt({ gt: 0 })
    .withMessage('Serving size must be a positive integer'),
  body('mealType')
    .optional()
    .isString()
    .withMessage('Meal type must be a string'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = validateInput;