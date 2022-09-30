const mongoose = require('mongoose');
const { Schema, model } = mongoose;
 
const orderSchema = new Schema({
  client: { type: Schema.Types.ObjectId, ref: 'Client' },
  address: {type: String},

},
{ timestamps: true }
);
 
module.exports = model('Order', orderSchema);