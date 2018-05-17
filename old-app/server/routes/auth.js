const express = require('express');
const router = express.Router();


const userController = require('../controllers/userController');

// Set up the 'signin' routes
router.post('/signin', userController.signin);

router.post('/signup', userController.signup);


module.exports = router;
