import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  sku: {
    type: String,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    data: Buffer,
    mimetype: String,
  },
  discount: {
    type: Number,
    default: 0,
  },
  bgcolor: String,
  panelcolor: String,
  textcolor: String,
});

export const productmodel = mongoose.model("product", productSchema);
