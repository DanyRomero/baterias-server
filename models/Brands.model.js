const mongoose = require('mongoose');
const { Schema, model } = mongoose;
 
const brandSchema = new Schema({
  name: {
    type: String,
    unique: true
  }
});
 
module.exports = model('Brand', brandSchema);