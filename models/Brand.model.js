const mongoose = require('mongoose');
const { Schema, model } = mongoose;
 
const brandSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  models: [ { type: Schema.Types.ObjectId, ref: 'Models' },]
});
 
module.exports = model('Brand', brandSchema);