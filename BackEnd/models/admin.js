const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adminModel = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  candidates: [
    {
      type: Schema.Types.ObjectId,
      ref: "Candidate",
    },
  ],
});

module.exports = mongoose.model("Admin", adminModel);
