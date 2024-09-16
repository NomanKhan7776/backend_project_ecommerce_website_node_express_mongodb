import mongoose from "mongoose";

const ownerSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: [true, "Enter Full Name"],
    minlength: [3, "Name must be at least 3 characters long"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: true,
    minlength: [4, "please enter atleast 4 characters"],
  },
  products: Array,
  picture: String,
});

const owner = mongoose.model("owner", ownerSchema);
export default owner;
