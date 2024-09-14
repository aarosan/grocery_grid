const Meal = require('../models/Meal');
const User = require('../models/User');

// Create a new meal document
const createMeal = async (req, res) => {
  try {
    // console.log("REQ.USERID", req.userId);

    // Make sure to include the user ID from the request
    const newMeal = new Meal({
      ...req.body,
      user: req.userId, // Assuming you have middleware that sets req.userId to the authenticated user's ID
    });
    // console.log("New meal:", newMeal);

    await newMeal.save();

    await User.findByIdAndUpdate(
      req.userId, 
      { $push: { meals: newMeal._id } },
      { new: true }
    );
    // console.log("User updated with new meal");

    res.status(201).json(newMeal);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all meal documents
const getMeals = async (req, res) => {
  try {
    // console.log("User ID from request:", req.userId); // Log the user ID
    const meals = await Meal.find({ user: req.userId });
    // console.log("MEALS:", meals);
    res.status(200).json(meals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Get a single meal document by ID
const getMealById = async (req, res) => {
  try {
    const meal = await Meal.findOne({ _id: req.params.id, user: req.userId }); // Ensure the meal belongs to the user
    if (!meal) {
      return res.status(404).json({ error: 'Meal not found' });
    }
    res.status(200).json(meal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a meal document by ID
const updateMealById = async (req, res) => {
  try {
    const updatedMeal = await Meal.findOneAndUpdate(
      { _id: req.params.id, user: req.userId }, // Ensure the meal belongs to the user
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedMeal) {
      return res.status(404).json({ error: 'Meal not found' });
    }
    res.status(200).json(updatedMeal);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a meal document by ID
const deleteMealById = async (req, res) => {
  try {
    console.log('deleteMealById invoked');
    const deletedMeal = await Meal.findOneAndDelete({ _id: req.params.id, user: req.userId }); // Ensure the meal belongs to the user
    console.log('deletedMeal:', deletedMeal);
    if (!deletedMeal) {
      return res.status(404).json({ error: 'Meal not found' });
    }
    res.status(200).json({ message: 'Meal deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



module.exports = {
  createMeal,
  getMeals,
  getMealById,
  updateMealById,
  deleteMealById
};
