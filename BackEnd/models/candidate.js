const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const candidateModel = new Schema({
  name: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  feedback: {
    type: String,
  },
  rating: {
    type: Number,
  },
  interviewer: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Candidate", candidateModel);
