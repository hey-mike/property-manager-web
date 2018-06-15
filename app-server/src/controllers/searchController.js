const SearchService = require('../services/searchService.js');

exports.getSuggestions = async function(req, res) {
  try {
    const { text, size } = req.body;
    const result = await SearchService.getSuggestions(text, size);
    res.json(result);
  } catch (err) {
    res.status(500).json({
      message: `Internal Server Error: ${err}`
    });
  }
};

exports.search = async function(req, res) {
  try {
    const result = await SearchService.search(req.body);
    res.json(result);
  } catch (err) {
    res.status(500).json({
      message: `Internal Server Error: ${err}`
    });
  }
};
exports.deleteESIndex = async function(req, res) {
  try {
    const result = await SearchService.deleteIndex();
    res.json(result);
  } catch (err) {
    res.status(500).json({
      message: `Internal Server Error: ${err}`
    });
  }
};
exports.createMapping = async function(req, res) {
  try {
    const result = await SearchService.createMapping();
    console.log(result);
    res.json(result);
  } catch (err) {
    res.status(500).json({
      message: `Internal Server Error: ${err}`
    });
  }
};
exports.getMapping = async function(req, res) {
  try {
    const result = await SearchService.getMapping();
    res.json(result);
  } catch (err) {
    res.status(500).json({
      message: `Internal Server Error: ${err}`
    });
  }
};
