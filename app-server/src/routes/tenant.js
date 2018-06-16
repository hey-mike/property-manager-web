const express = require('express');
const router = express.Router();
const tenantController = require('../controllers/tenantController');

/* GET tenantController listing. */

router.get('/:tenantId', tenantController.read);
router.put('/:tenantId', tenantController.update);
router.delete('/:tenantId', tenantController.delete);

router.get('/', tenantController.list);
router.post('/', tenantController.create);

module.exports = router;
