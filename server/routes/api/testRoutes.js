const express = require('express');
const router = express.Router();

// import the testController controllers
const {
  createTest,
  getTests,
  getTestById,
  updateTestById,
  deleteTestById,
} = require('../../controllers/testController');


// Define routes and associate them with controller functions
router.post('/', createTest);
router.get('/', getTests);
router.get('/:id', getTestById);
router.put('/:id', updateTestById);
router.delete('/:id', deleteTestById);

module.exports = router;
