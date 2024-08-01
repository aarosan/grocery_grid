const { Schema, model } = require('mongoose');

const MealSchema = new Schema({
  mealType: { type: String, required: true }, // e.g., Breakfast, Lunch, Dinner
  mealName: { type: String, required: true },
  ingredients: { type: [String], required: true }, // List of ingredients as strings
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

const Meal = model('Meal', MealSchema);

module.exports = Meal;
