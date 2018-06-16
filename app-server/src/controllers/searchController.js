// const seartchStrategyFactory = require('../services/seartchStrategyFactory.js');
const seartchStrategyFactory = require('../services/seartchStrategyFactory');

exports.getSuggestions = async function(req, res) {
  try {
    const { text, size } = req.body;
    const result = await seartchStrategyFactory
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
    console.log('seartchStrategyFactory', seartchStrategyFactory);
    const result = await seartchStrategyFactory.getStrategy().search(req.body);
    res.json(result);
  } catch (err) {
    res.status(500).json({
      message: `Internal Server Error: ${err}`
    });
  }
};
exports.deleteESIndex = async function(req, res) {
  try {
    const result = await seartchStrategyFactory.getStrategy().deleteIndex();
    res.json(result);
  } catch (err) {
    res.status(500).json({
      message: `Internal Server Error: ${err}`
    });
  }
};
exports.createMapping = async function(req, res) {
  try {
    const result = await seartchStrategyFactory.createMapping();
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
    const result = await seartchStrategyFactory.getMapping();
    res.json(result);
  } catch (err) {
    res.status(500).json({
      message: `Internal Server Error: ${err}`
    });
  }
};
