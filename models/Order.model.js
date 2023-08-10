const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const addressSchema = new Schema({
  addressOne: {
    type: String,
    required: true,
  },
  addressTwo: {
    type: String,
  },
  zipCode: {
    type: String,
    required: true,
  },
  town: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
});

const orderSchema = new Schema(
  {
    brand: { type: Schema.Types.ObjectId, ref: "Brand" },
    model: { type: Schema.Types.ObjectId, ref: "Model" },
    year: { type: Schema.Types.ObjectId },
    battery: { type: Schema.Types.ObjectId, ref: "Battery" },
    client: { type: Schema.Types.ObjectId, ref: "Client" },
    address: addressSchema,
    deliveryType: { type: String },
    deliveryHour: {type: Date},
    deliverBattery: {type: String},
    completedAt: { type: Date },
    printedAt: {type: Date},
    orderId: {type: Number, default: 0},
    status: {type: String, default:'cotizacion' },
    onTheWayAt: {type: Date},
    instaledAt: {type: Date},
  },
  { timestamps: true }
);

module.exports = model("Order", orderSchema);
