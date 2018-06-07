const mongoose = require("mongoose");
const ElasticSearch = require('../services/searchService'); 
const Schema = mongoose.Schema;

const tenantSchema = new Schema({
  id: Number,
  name: {
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
  } ,
  phone: String,
  address: String,
}, {
  timestamps: true
});


tenantSchema.virtual('fullName').get(function () {
  return this.name.firstName + ' ' + this.name.lastName;
}).set(function (v) {
  this.name.firstName = v.substr(0, v.indexOf(' '));
  this.name.lastName = v.substr(v.indexOf(' ') + 1);
});
tenantSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});
tenantSchema.post('save', function (doc) {
  ElasticSearch.update(doc)
});
tenantSchema.index({
  email:'text'
});
// Configure the 'tenantSchema' to use getters and virtuals when transforming to JSON
tenantSchema.set('toJSON', {
  getters: true,
  virtuals: true
});


const tenant = mongoose.model("Tenant", tenantSchema);

module.exports = tenant;
