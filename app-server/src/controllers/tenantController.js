const mongoose = require('mongoose');
const Tenant = require('../models/tenant');
const SearchService = require('../services/searchService.js');

exports.search = async function(req, res) {
  const { body } = req.body;
  // const offset = req.query._offset ? parseInt(req.query._offset, 10) : 0;
  // let limit = req.query._limit ? parseInt(req.query._limit, 10) : 20;
  console.log();
  try {
    const result = await SearchService.search(body);
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
    const newTenant = new Tenant(newTenant);
    const Tenant = await newTenant.save();
    res.json(Tenant);
    return Tenant;
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
  try {
    documentId = mongoose.Types.ObjectId(req.params.id);
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
      return res.status(404).json({
        message: `No such tenant: ${documentId}`
      });
    } else {
      return res.json(tenant);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: `Internal Server Error: ${error}`
    });
  }
};

// update tenant
exports.update = function(req, res) {
  let _id;
  try {
    _id = mongoose.Types.ObjectId(req.params.id);
  } catch (error) {
    return res.status(422).json({
      message: `Invalid issue ID format: ${error}`
    });
  }

  const tenant = req.body;
  tenant.updatedAt = new Date();

  try {
    const tenant = Tenant.findOneAndUpdate(
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

  // Tenant.findOneAndUpdate(
  //   {
  //     _id: _id
  //   },
  //   {
  //     $set: tenant
  //   },
  //   {
  //     new: true
  //   },
  //   function(err, updatedTenant) {
  //     if (err) return handleError(err, res);
  //     res.json(updatedTenant);
  //   }
  // );
};

// delete tenant
exports.delete = function(req, res) {
  let docId;
  try {
    docId = mongoose.Types.ObjectId(req.params.id);
  } catch (error) {
    return res.status(422).json({
      message: `Invalid issue ID format: ${error}`
    });
  }
  Tenant.deleteOne({
    _id: docId
  })
    .then(deleteResult => {
      if (deleteResult.result.n === 1)
        res.json({
          status: 'OK'
        });
      else
        res.json({
          status: 'Warning: object not found'
        });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: `Internal Server Error: ${error}`
      });
    });
};
