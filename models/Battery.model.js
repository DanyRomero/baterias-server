const mongoose = require('mongoose');
const { Schema, model } = mongoose;
 
const batterySchema = new Schema({
  name: {
    type: String,
  },
  model: {
    type: String,
  },
  price:{
    type: Number
  }
});
 
module.exports = model('Battery', batterySchema);