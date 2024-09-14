import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mongoURI = process.env.DATABASE_MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("MongoDB connected successfully");
    const db = mongoose.connection;

    db.on("error", (error) => {
      console.error("MongoDB connection error:", error);
    });

    db.on("disconnected", () => {
      console.log("MongoDB disconnected");
    });

    db.on("reconnected", () => {
      console.log("MongoDB reconnected");
    });

    process.on("unhandledRejection", (error) => {
      console.error("Unhandled Rejection:", error);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

export default connectDB;
