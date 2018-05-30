const express = require('express');
const router = express.Router();
const {
    check
} = require('express-validator/check');

const userController = require('../controllers/userController');

// Set up the 'signin' routes
router.post('/signin', [
    // username must be an email
    check('username').isEmail(),
    // password must be at least 5 chars long
    check('password').isLength({
        min: 5
    })
    .withMessage('must be at least 5 chars long')
    .matches(/\d/).withMessage('must contain a number')
], userController.signIn);

router.post('/signup', [
    // username must be an email
    check('email').isEmail()
    .withMessage('must be at least 5 chars long')
    .matches(/\d/).withMessage('must contain a number'),
    // password must be at least 5 chars long
    check('password').isLength({
        min: 5
    })
    .withMessage('must be at least 5 chars long')
    .matches(/\d/).withMessage('must contain a number')
], userController.create);


module.exports = router;