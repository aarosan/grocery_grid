// This is where you will define all controllers for the Test model
// Each model is typically kept in its own file in controllers
// There isn't an index.js for controllers

const Test = require('../models/test');

// Create a new test document
const createTest = async (req, res) => {
  try {
    const newTest = new Test(req.body);
    console.log(newTest)
    await newTest.save();
    res.status(201).json(newTest);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all test documents
const getTests = async (req, res) => {
  try {
    const tests = await Test.find();
    res.status(200).json(tests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single test document by ID
const getTestById = async (req, res) => {
  try {
    const test = await Test.findById(req.params.id);
    if (!test) {
      return res.status(404).json({ error: 'Test not found' });
    }
    res.status(200).json(test);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a test document by ID
const updateTestById = async (req, res) => {
  try {
    const updatedTest = await Test.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedTest) {
      return res.status(404).json({ error: 'Test not found' });
    }
    res.status(200).json(updatedTest);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a test document by ID
const deleteTestById = async (req, res) => {
  try {
    const deletedTest = await Test.findByIdAndDelete(req.params.id);
    if (!deletedTest) {
      return res.status(404).json({ error: 'Test not found' });
    }
    res.status(200).json({ message: 'Test deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createTest,
  getTests,
  getTestById,
  updateTestById,
  deleteTestById,
};
