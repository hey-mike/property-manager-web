const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');


// es services
router.post('/suggest', searchController.getSuggestions);
router.get('/mapping', searchController.getMapping);
router.post('/mapping', searchController.createMapping);


router.post('/',  searchController.search);
router.delete('/', searchController.deleteESIndex);

module.exports = router;
