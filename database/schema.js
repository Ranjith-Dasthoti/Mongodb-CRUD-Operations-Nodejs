const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Data = new Schema({
  _id: { type: String },
  name: { type: String },
  password: { type: String },
  createdAt: { type: String }
});

module.exports = mongoose.model("Data", Data);
