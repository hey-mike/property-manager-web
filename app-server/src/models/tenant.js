const mongoose = require('mongoose');
const ElasticSearch = require('../services/searchService');
const Schema = mongoose.Schema;

const tenantSchema = new Schema(
  {
    id: Number,
    firstName: {
      type: Object,
      required: true,
      trim: true
    },
    lastName: {
      type: Object,
      required: true,
      trim: true
    },
    gender: String,
    age: Number,
    title: String,
    email: {
      type: String,
      required: true,
      trim: true
    },
    phone: String,
    address: String,
    startDate: Date,
    endDate: Date,
    passportImg: { data: Buffer, contentType: String }
  },
  {
    timestamps: true
  }
);

tenantSchema
  .virtual('fullName')
  .get(function() {
    return this.firstName + ' ' + this.lastName;
  })
  .set(function(v) {
    this.firstName = v.substr(0, v.indexOf(' '));
    this.lastName = v.substr(v.indexOf(' ') + 1);
  });
tenantSchema.pre('save', async function() {
  this.updatedAt = Date.now();
});
tenantSchema.post('save', async function(doc) {
  try {
    await ElasticSearch.update(doc);
  } catch (err) {
    throw new Error('something went wrong:', err);
  }
});
tenantSchema.post('insertMany', async function(docs) {
  try {
    await ElasticSearch.bulk(docs);
  } catch (err) {
    throw new Error('something went wrong:', err);
  }
});
tenantSchema.post('update', function(doc) {
  console.log('%s has been update', doc._id);
});
tenantSchema.post('remove', function(doc) {
  console.log('%s has been removed', doc._id);
});

// Configure the 'tenantSchema' to use getters and virtuals when transforming to JSON
tenantSchema.set('toJSON', {
  getters: true,
  virtuals: true
});

const tenant = mongoose.model('Tenant', tenantSchema);

module.exports = tenant;
