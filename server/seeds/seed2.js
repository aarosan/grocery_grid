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
  const hashedPassword1 = await bcrypt.hash('password', saltRounds);
  const user1 = new User({
    firstName: 'Aaron',
    lastName: 'Sanchez',
    username: 'aarosan',
    password: hashedPassword1, // Use the hashed password
  });

  // Save users to DB
  await user1.save();

  // Define meals for each user
  const meals1 = [
    { mealType: ['Breakfast'], mealName: 'Raisin Bran', ingredients: ["Kellogg's Raisin Bran Original Cold Breakfast Cereal", 'Fairlife Fat Free Lactose Free Milk'], user: user1._id },
    { mealType: ['Breakfast'], mealName: 'Cheerios', ingredients: ['General Mills Honey Nut Cheerios Cereal', 'Fairlife Fat Free Lactose Free Milk'], user: user1._id },
    { mealType: ['Breakfast'], mealName: 'Everything Bagel', ingredients: ["Thomas' Everything Pre-Sliced Bagels", 'H‑E‑B Chive & Onion Cream Cheese Spread'], user: user1._id },
    { mealType: ['Breakfast'], mealName: 'Everything Bagel', ingredients: ["Thomas' Cinnamon Raisin Pre-Sliced Bagels", 'Hill Country Fare Cream Cheese'], user: user1._id },
    { mealType: ['Lunch'], mealName: 'Roast Beef Sandwich', ingredients: ["H‑E‑B Round Top Large White Enriched Bread", 'Hill Country Fare Thin Sliced Roast Beef', 'H‑E‑B Yellow Mustard', 'H‑E‑B Jalapeño Monterey Jack Sliced Cheese'], user: user1._id },
    { mealType: ['Lunch'], mealName: 'Spinach Salad', ingredients: ["H‑E‑B Fresh Baby Spinach", 'H‑E‑B Onion & Garlic Premium Croutons', 'H‑E‑B Bacon Pieces', 'Fresh Gourmet Crispy Jalapenos Lightly Salted', 'Whataburger Spicy Jalapeno Ranch', '1 Fresh Red Onion', '1 Fresh Cilantro', '4 Fresh Lime'], user: user1._id },
    { mealType: ['Lunch'], mealName: 'Meal Simple Chicken & Sausage Rigatoni', ingredients: ["Meal Simple by H‑E‑B Chicken & Sausage Rigatoni Pasta Bowl"], user: user1._id },
    { mealType: ['Snack'], mealName: 'Extra Toasty Cheez-its', ingredients: ["Cheez-It Extra Toasty Cheese Crackers"], user: user1._id },
    { mealType: ['Snack'], mealName: 'Limon Potato Chips', ingredients: ["Lay's Limon Potato Chips"], user: user1._id },
    { mealType: ['Snack'], mealName: 'Sugar Free Popsicles', ingredients: ["Popsicle Sugar Free Orange Cherry Grape Ice Pops"], user: user1._id },
    { mealType: ['Snack'], mealName: 'Nilla Wafers', ingredients: ["Nabisco Nilla Wafers"], user: user1._id },
    { mealType: ['Dinner'], mealName: 'Chicken, Rice, and Potatoes', ingredients: ["H‑E‑B Natural Boneless Chicken Breasts", "Zatarain's New Orleans Style Long Grain & Wild Rice Mix", "H‑E‑B Frozen Steamable Red Potatoes & Green Beans in Butter Sauce"], user: user1._id },
    { mealType: ['Dinner'], mealName: 'Sausage, Beans, and Rice', ingredients: ["H‑E‑B Texas Heritage Beef Smoked Sausage", "H‑E‑B Black Beans", "Zatarain's Dirty Rice Dinner Mix"], user: user1._id },
  ];

  // Save meals for user1
  const savedMeals1 = [];
  for (const meal of meals1) {
    const newMeal = new Meal(meal);
    await newMeal.save();
    savedMeals1.push(newMeal._id); // Collect saved meal IDs
  }

  // Update users with their meals
  user1.meals = savedMeals1; // Associate meals with user1

  // Save the updated users
  await user1.save();

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
