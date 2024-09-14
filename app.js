import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/mongoose-connection.js";
import dotenv from "dotenv";
import usersRouter from "./routes/usersRouter.js";
import ownerRouter from "./routes/ownerRouter.js";
import productsRouter from "./routes/productsRouter.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.use("/products", productsRouter);
app.use("/owner", ownerRouter);
app.use("/users", usersRouter);

app.listen(3000);
