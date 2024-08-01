// This index.js is the entrance point for the models directory
// All of the models are imported and then exported all together

const Test = require('./test');
const User = require('./User');
const Meal = require('./Meal')

module.exports = { Test, User, Meal};
