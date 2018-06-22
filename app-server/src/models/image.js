const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema(
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

const image = mongoose.model('Image', ImageSchema);
module.exports = image;