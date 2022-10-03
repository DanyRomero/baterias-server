const mongoose = require('mongoose');
const { Schema, model } = mongoose;
 
const clientSchema = new Schema({
  name: {
    type: String,
  },
  lastName:{
    type: String,
  },
  email:{
    type: String,
  },
  phone: {
    type: Number,
  }
});
 
module.exports = model('Client', clientSchema);