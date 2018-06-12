const express = require('express');
const router = express.Router();
const tenantController = require('../controllers/tenantController');

/* GET tenantController listing. */
router.get('/', tenantController.list);
router.post('/', tenantController.create);
router.post('/search', tenantController.search);
router.get('/mapping', tenantController.getMapping);
router.post('/mapping', tenantController.createMapping);

router.get('/:tenantId', tenantController.read);
router.put('/:tenantId', tenantController.update);
router.delete('/:tenantId', tenantController.delete);


module.exports = router;
