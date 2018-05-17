const express = require('express');
const transactionController = require('../controllers/transactionController');

const router = express.Router();

/* GET userController listing. */
router.get('/', function (req, res, next) {
  transactionController.transaction_list(req, res, next);
});
router.get('/report', function (req, res, next) {
  transactionController.transaction_report(req, res, next);
});

module.exports = router;
