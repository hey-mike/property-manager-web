const express = require('express');
const router = express.Router();
const tenantController = require('../controllers/tenantController');

/* GET tenantController listing. */

// es services
router.post('/search', tenantController.search);
router.get('/suggest/:text/:size', tenantController.getSuggestions);
router.get('/mapping', tenantController.getMapping);
router.post('/mapping', tenantController.createMapping);
router.post('/delete', tenantController.deleteESIndex);


router.get('/:tenantId', tenantController.read);
router.put('/:tenantId', tenantController.update);
router.delete('/:tenantId', tenantController.delete);


router.get('/', tenantController.list);
router.post('/', tenantController.create);


module.exports = router;
