// seeds/seed.js
const mongoose = require('mongoose');
const User = require('../models/User');
const Meal = require('../models/Meal');
const bcrypt = require('bcryptjs'); // Import bcrypt
const connection = require('../config/connection'); // Import your existing connection

// Seed function
const seedDB = async () => {
  await User.deleteMany(); // Clear existing users
  await Meal.deleteMany(); // Clear existing meals

  const saltRounds = 10; // Adjust this value for security

  // Create users with hashed passwords
  const hashedPassword1 = await bcrypt.hash('password1', saltRounds);
  const user1 = new User({
    firstName: 'Alice',
    lastName: 'Smith',
    username: 'alice',
    password: hashedPassword1, // Use the hashed password
  });

  const hashedPassword2 = await bcrypt.hash('password2', saltRounds);
  const user2 = new User({
    firstName: 'Bob',
    lastName: 'Johnson',
    username: 'bob',
    password: hashedPassword2, // Use the hashed password
  });

  // Save users to DB
  await user1.save();
  await user2.save();

  // Define meals for each user
  const meals1 = [
    { mealType: 'Breakfast', mealName: 'Pancakes', ingredients: ['Flour', 'Eggs', 'Milk'], user: user1._id },
    { mealType: 'Lunch', mealName: 'Salad', ingredients: ['Lettuce', 'Tomato', 'Cucumber'], user: user1._id },
  ];

  const meals2 = [
    { mealType: 'Dinner', mealName: 'Spaghetti', ingredients: ['Pasta', 'Tomato Sauce', 'Meatballs'], user: user2._id },
    { mealType: 'Snack', mealName: 'Fruit Salad', ingredients: ['Apples', 'Bananas', 'Grapes'], user: user2._id },
  ];

  // Save meals for user1
  const savedMeals1 = [];
  for (const meal of meals1) {
    const newMeal = new Meal(meal);
    await newMeal.save();
    savedMeals1.push(newMeal._id); // Collect saved meal IDs
  }

  // Save meals for user2
  const savedMeals2 = [];
  for (const meal of meals2) {
    const newMeal = new Meal(meal);
    await newMeal.save();
    savedMeals2.push(newMeal._id); // Collect saved meal IDs
  }

  // Update users with their meals
  user1.meals = savedMeals1; // Associate meals with user1
  user2.meals = savedMeals2; // Associate meals with user2

  // Save the updated users
  await user1.save();
  await user2.save();

  console.log('Database seeded');
};

// Run the seed script
const runSeed = async () => {
  // Ensure the connection is established before running the seed
  connection.on('connected', async () => {
    await seedDB();
    mongoose.connection.close();
  });

  connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
  });
};

// Start the seeding process
runSeed();
