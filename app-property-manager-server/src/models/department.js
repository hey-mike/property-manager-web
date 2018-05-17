const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const deparmentSchema = new Schema({
  id: Number,
  name: {
    type: String,
    required: true
  },
  manager: Schema.Types.ObjectId,
  location: String,
}, {
  timestamps: true
});
const Deparment = mongoose.model("deparments", deparmentSchema);
module.exports = Deparment;
