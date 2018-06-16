const express = require('express');
const router = express.Router();
const tenantController = require('../controllers/tenantController');

/* GET tenantController listing. */

router.get('/:id', tenantController.read);
router.put('/:id', tenantController.update);
router.delete('/:id', tenantController.delete);

router.get('/', tenantController.list);
router.post('/', tenantController.create);

module.exports = router;
