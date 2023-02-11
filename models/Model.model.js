const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const yearSchema = new Schema({
  from: {
    type: Number,
    required: true,
  },
  to: {
    type: Number,
    required: true,
  },
  batteries: [{ type: Schema.Types.ObjectId, ref: "Battery" }],
});

const modelSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  years: [yearSchema],
  brand: { type: Schema.Types.ObjectId, ref: "Brand" },
});

module.exports = model("Model", modelSchema);
