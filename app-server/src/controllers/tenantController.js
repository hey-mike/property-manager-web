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
  console.log('documentId', documentId);

  Tenant.findOne({ _id: documentId }, function(err, tenant) {
    if (tenant) {
      return res.json(tenant);
    }
    return res.status(404).json({
      message: `No such tenant: ${documentId}`
    });
  });
  // try {
  //   const tenant = await Tenant.findOne({
  //     _id: documentId
  //   });

  //   if (tenant) {
  //     return res.json(tenant);
  //   }
  //   return res.status(404).json({
  //     message: `No such tenant: ${documentId}`
  //   });
  // } catch (error) {
  //   console.log(error);
  //   return res.status(500).json({
  //     message: `Internal Server Error: ${error}`
  //   });
  // }
};

// update tenant
exports.update = function(req, res) {
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
