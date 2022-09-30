const mongoose = require('mongoose');
const { Schema, model } = mongoose;
 
const modelSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  year: [ { type: Schema.Types.ObjectId, ref: 'Years' },],
  brand:{ type: Schema.Types.ObjectId, ref: 'Brand' }
});
 
module.exports = model('Model', modelSchema);