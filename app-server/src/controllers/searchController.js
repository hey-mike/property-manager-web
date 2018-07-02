// const searchStrategyFactory = require('../services/searchStrategyFactory.js');
const searchStrategyFactory = require('../services/searchStrategyFactory');

exports.getSuggestions = async function(req, res) {
  try {
    const { text, size } = req.body;
    const result = await searchStrategyFactory
      .getStrategy()
      .getSuggestions(text, size);
    res.json(result);
  } catch (err) {
    res.status(500).json({
      message: `Internal Server Error: ${err}`
    });
  }
};

exports.search = async function(req, res) {
  try {
    console.log('searchStrategyFactory', searchStrategyFactory);
    const result = await searchStrategyFactory.getStrategy().search(req.body);
    res.json(result);
  } catch (err) {
    res.status(500).json({
      message: `Internal Server Error: ${err}`
    });
  }
};
exports.deleteESIndex = async function(req, res) {
  try {
    const result = await searchStrategyFactory.getStrategy().deleteIndex();
    res.json(result);
  } catch (err) {
    res.status(500).json({
      message: `Internal Server Error: ${err}`
    });
  }
};
exports.createMapping = async function(req, res) {
  try {
    const result = await searchStrategyFactory.getStrategy().createMapping();
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
    const result = await searchStrategyFactory.getStrategy().getMapping();
    res.json(result);
  } catch (err) {
    res.status(500).json({
      message: `Internal Server Error: ${err}`
    });
  }
};
