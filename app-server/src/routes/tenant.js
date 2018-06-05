const express = require('express');
const router = express.Router();
const tenantController = require('../controllers/tenantController');


/* GET tenantController listing. */
router.get('/', function (req, res, next) {
  tenantController.list(req, res, next);
  //res.end(tenantController.list);
});
router.post('/', function (req, res, next) {
  tenantController.create(req, res, next);
});


// Set up the 'tenantController' parameterized routes
router.get('/:tenantId', function (req, res) {
  tenantController.read(req, res);
  //res.send("update");
})
router.put('/:tenantId', function (req, res) {
  tenantController.update(req, res);
  //res.send("read");
})
router.delete('/:tenantId', function (req, res) {
  tenantController.delete(req, res);
  //  res.send("delete");
})
router.search('/search', function (req, res) {
  tenantController.search(req, res);
  //  res.send("delete");
})

module.exports = router;