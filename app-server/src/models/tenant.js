const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tenantSchema = new Schema({
  id: Number,
  name: {
    type: Object,
    required: true,
    text: true,
    index: true,
    trim: true
  },
  gender: String,
  age: Number,
  title: String,
  email: String,
  phone: String,
  address: String,
}, {
  timestamps: true
});


tenantSchema.virtual('fullName').get(function () {
  return this.name.first + ' ' + this.name.last;
}).set(function (v) {
  this.name.first = v.substr(0, v.indexOf(' '));
  this.name.last = v.substr(v.indexOf(' ') + 1);
});
tenantSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});
tenantSchema.index({
  name: 'text'
});
// Configure the 'tenantSchema' to use getters and virtuals when transforming to JSON
tenantSchema.set('toJSON', {
  getters: true,
  virtuals: true
});

const tenant = mongoose.model("Tenant", tenantSchema);

module.exports = tenant;
