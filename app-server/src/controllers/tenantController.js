const mongoose = require('mongoose');
const Tenant = require('../models/tenant');

exports.list = async function(req, res) {
  try {
    const Tenants = await Tenant.find({});
    res.json(Tenants);
  } catch (err) {
    res.status(500).json({
      message: `Internal Server Error: ${err.message}`
    });
  }
};

exports.create = async function(req, res) {
  const req_tenant = req.body;
  req_tenant.created = new Date();
  if (!req_tenant.status) {
    req_tenant.status = 'New';
  }
  try {
    const newTenant = new Tenant(req_tenant);
    const tenant = await newTenant.save();
    console.log('Tenant', tenant);
    res.json(tenant);
  } catch (err) {
    res.status(500).json({
      message: `Internal Server Error: ${err}`
    });
  }
};

exports.delete = async function(req, res) {
  let { docIds } = req.body;
  try {
    docIds = docIds.map(id => mongoose.Types.ObjectId(id));
  } catch (error) {
    res.status(422).json({
      message: `Invalid issue ID format: ${error}`
    });
    return;
  }

  try {
    const deleteResult = await Tenant.deleteMany({
      _id: {
        $in: docIds
      }
    });
    if (deleteResult.result.n === docIds.length) {
      return res.json({
        status: 'OK'
      });
    } else {
      return res.json({
        status: 'Warning: object not found'
      });
    }
  } catch (error) {
    res.status(500).json({
      message: `Internal Server Error: ${error}`
    });
  }
};

// Get tenant detail
exports.read = async function(req, res) {
  let documentId;
  console.log('req.params.id', req.params.id);
  try {
    documentId = new mongoose.Types.ObjectId(req.params.id);
  } catch (error) {
    return res.status(422).json({
      message: `Invalid issue ID format: ${error}`
    });
  }

  try {
    const tenant = await Tenant.findOne({
      _id: documentId
    });

    if (tenant) {
      return res.json(tenant);
    }
    return res.status(404).json({
      message: `No such tenant: ${documentId}`
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: `Internal Server Error: ${error}`
    });
  }
};

// update tenant
exports.update = async function(req, res) {
  let _id;
  try {
    _id = new mongoose.Types.ObjectId(req.params.id);
  } catch (error) {
    return res.status(422).json({
      message: `Invalid issue ID format: ${error}`
    });
  }

  const tenant = req.body;
  tenant.updatedAt = new Date();

  try {
    const tenant = await Tenant.findOneAndUpdate(
      {
        _id: _id
      },
      {
        $set: tenant
      },
      {
        new: true
      }
    );
    res.json(tenant);
  } catch (error) {
    return res.status(500).json({
      message: `Internal Server Error: ${error}`
    });
  }
};

// delete tenant
exports.delete = async function(req, res) {
  let docId;
  try {
    docId = mongoose.Types.ObjectId(req.params.id);
  } catch (error) {
    return res.status(422).json({
      message: `Invalid issue ID format: ${error}`
    });
  }

  try {
    const result = await Tenant.deleteOne({
      _id: docId
    });
    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: `Internal Server Error: ${err}`
    });
  }
};
