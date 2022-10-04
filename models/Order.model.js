const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const orderSchema = new Schema(
  {
    brand: { type: Schema.Types.ObjectId, ref: "Brand" },
    model: { type: Schema.Types.ObjectId, ref: "Model" },
    year: { type: Schema.Types.ObjectId },
    battery: { type: Schema.Types.ObjectId, ref: "Battery" },
    client: { type: Schema.Types.ObjectId, ref: "Client" },
    address: { type: String },
    completedAt: { type: Date }
  },
  { timestamps: true }
);

module.exports = model("Order", orderSchema);
