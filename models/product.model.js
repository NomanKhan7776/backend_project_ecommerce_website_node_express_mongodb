import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "please enter product name"],
  },
  price: {
    type: Number,
    required: [true, "please enter price"],
  },
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
