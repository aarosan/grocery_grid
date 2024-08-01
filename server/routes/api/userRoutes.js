const express = require('express');
const router = express.Router();
const { signup, login } = require('../../controllers/userController');
const {
    createMeal,
    getMeals,
    getMealById,
    updateMealById,
    deleteMealById,
  } = require('../../controllers/mealController');
  const authenticateToken = require('../../middleware/auth');

// User routes
router.post('/signup', signup);
router.post('/login', login);

// Meal routes nested under /users
router.use(authenticateToken); // Authenticate for all following routes
router.post('/meals', createMeal);
router.get('/meals', getMeals);
router.get('/meals/:id', getMealById);
router.put('/meals/:id', updateMealById);
router.delete('/meals/:id', deleteMealById);

module.exports = router;
