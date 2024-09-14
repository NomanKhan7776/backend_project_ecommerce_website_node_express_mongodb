import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  name: String,
  price: Number,
  image: String,
  discount: {
    type: Number,
    default: 0,
  },
  bgcolor: String,
  panelcolor: String,
  textcolor: String,
});

export default mongoose.model("product", productSchema);
