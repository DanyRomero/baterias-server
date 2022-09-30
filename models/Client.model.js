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
  },
  payment: {
    type: String,
    enum:['Efectivo', 'Terminal de Pago', 'Transferencia']

  }
});
 
module.exports = model('Client', clientSchema);