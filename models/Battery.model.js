const mongoose = require('mongoose');
const { Schema, model } = mongoose;
 
const batterySchema = new Schema({
  model: {
    type: String,
  },
  brand: {
    type: String,
  },
  price:{
    type: Number
  },
  guarantee:{
    type: Number
  },
  amps:{
    type: Number
  }

});
 
module.exports = model('Battery', batterySchema);