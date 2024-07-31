const { Schema, model } = require('mongoose');

const testSchema = new Schema(
  {
    testBody: {
      type: String,
      required: true, // This ensures that a string must be provided
    },
    createdAt: {
      type: Date,
      default: Date.now, // Automatically sets the date when a new document is created
    },
  },
  {
    toJSON: {
      // This option allows you to customize the JSON output
      virtuals: true, // Allows virtuals to be included in the JSON output
    },
    id: false, // Disables the automatic __v field
  }
);

// Create the Test model
const Test = model('Test', testSchema);

module.exports = Test;