import mongoose from "mongoose";

const ownerSchema = mongoose.Schema({
  fullname: String,
  email: String,
  password: String,
  cart: Array,
  isAdmin: Boolean,
  contact: Number,
  picture: String,
});

export default mongoose.model("owner", ownerSchema);
