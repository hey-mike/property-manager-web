const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  id: Number,
  amount: Number,
  date: Date,
  bussiness: String,
  name: String,
  type: String,
  account: String,
}, {
  timestamps: true
});

transactionSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});
// Configure the 'employeeSchema' to use getters and virtuals when transforming to JSON
transactionSchema.set('toJSON', {
  getters: true,
  virtuals: true
});

const Transaction = mongoose.model("Transation", transactionSchema);

module.exports = Transaction;
