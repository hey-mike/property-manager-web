const express = require('express');
const router = express.Router();


const userController = require('../controllers/userController');

// Set up the 'signin' routes
router.post('/signin', userController.signIn);

router.post('/signup', userController.create);


module.exports = router;
