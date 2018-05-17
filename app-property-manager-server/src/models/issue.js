const mongoose = require("mongoose");


const issueSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  owner: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  effort: {
    type: String,
    required: true
  },
  completionDate: {
    type: String,
    required: true
  },
  comment: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
});

const issue = mongoose.model("issue", issueSchema);
module.exports = issue;
