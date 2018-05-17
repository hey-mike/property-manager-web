const express = require('express');
const path = require('path');

const router = express.Router();


router.get('/', function (req, res) {
  console.log('index route Called');
  res.sendFile(path.resolve('index.html'));
})

module.exports = router;
