import mongoose from "mongoose";
import dotenv from "dotenv";
import debug from "debug";
dotenv.config();

const mongoURI = process.env.DATABASE_MONGO_URI;
const log = debug("app:mongoose");

const connectDB = async () => {
  try {
    mongoose.set("debug", (collectionName, method, query, doc) => {
      log(`mongoose ${collectionName}.${method}`, query, doc);
    });

    await mongoose.connect(mongoURI);
    log("MongoDB connected successfully");
    const db = mongoose.connection;

    db.on("error", (error) => {
      log("MongoDB connection error:", error);
    });

    db.on("disconnected", () => {
      console.log("MongoDB disconnected");
    });

    db.on("reconnected", () => {
      log("MongoDB reconnected");
    });

    process.on("unhandledRejection", (error) => {
      log("Unhandled Rejection:", error);
    });
  } catch (error) {
    log("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

export default connectDB;
