const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  linkedin: {
    type: String,
  },
  github: {
    type: String,
  },
  twitter: {
    type: String,
  },
  insta: {
    type: String,
  },
  passphrase: {
    type: String,
    required: true,
  },
  event: {
    type: Array,
    required: true,
  },
});

module.exports = mongoose.model("Note", UserSchema);
