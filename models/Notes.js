const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  message:{
    type: String, 
    required: true
  },
  email:{
    type: String,
    required: true
  },
  linkedin:{
    type: String
  },
  twitter:{
    type: String
  },
  insta:{
    type: String
  }
});

module.exports = mongoose.model("Note", UserSchema);