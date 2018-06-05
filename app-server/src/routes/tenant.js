const express = require('express');
const router = express.Router();
const tenantController = require('../controllers/tenantController');

/* GET tenantController listing. */
router.get('/', tenantController.list);
router.post('/', tenantController.create);

// query string search
router.get('/search', tenantController.search);
// api search
router.post('/search', tenantController.search);

router.get('/:tenantId', tenantController.read);
router.put('/:tenantId', tenantController.update);
router.delete('/:tenantId', tenantController.delete);


module.exports = router;
