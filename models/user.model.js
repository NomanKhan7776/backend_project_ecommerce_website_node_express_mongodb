import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  cart: Array,
  orders: Array,
  contact: Number,
  picture: String,
});

const user = mongoose.model("user", userSchema);
export default user;
