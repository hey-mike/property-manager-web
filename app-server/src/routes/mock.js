const express = require('express');
const router = express.Router();

const fakerController = require('../controllers/fakerController');


/* GET userController listing. */
router.post('/',fakerController.generate_tenants);

module.exports = router;
