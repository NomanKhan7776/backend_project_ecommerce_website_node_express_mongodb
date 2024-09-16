import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/mongoose-connection.js";
import dotenv from "dotenv";
import usersRouter from "./routes/usersRouter.js";
import ownerRouter from "./routes/ownerRouter.js";
import productsRouter from "./routes/productsRouter.js";
import router from "./routes/index.js";
import flash from "connect-flash";
import session from "express-session";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(flash());
app.use((req, res, next) => {
  res.locals.messages = {
    success: req.flash("success"),
    error: req.flash("error"),
    errors: req.flash("errors"),
  };
  next();
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use("/", router);
app.use("/register", usersRouter);
app.use("/products", productsRouter);
app.use("/owner", ownerRouter);
app.use("/users", usersRouter);

app.listen(3000);
