var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const compression = require("compression");

var cors = require("cors");
const cloudinary = require("cloudinary");

const { connectDB } = require("./config/db/db");
const errorMiddleware = require("./middlewares/errorMiddleware");

if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "./config/env/.env" });
}

// * define routes
var usersRouter = require("./routes/usersRouter");
var contactsRouter = require("./routes/contactsRouter");
var productRouter = require("./routes/productRouter");
var ordersRouter = require("./routes/ordersRouter");
var otpRouter = require("./routes/otpRouter");

var generativeAiRouter = require("./routes/generative_aiRouter");

//* express
var app = express();

//* add cors
const corsOptions = {
  origin: ["http://www.amoreescents.shop/", "http://www.amoreescents.shop"],
  optionsSuccessStatus: 200,
  methods: ["GET", "PUT", "PATCH", "POST", "DELETE"],
  credentials: true,
};
app.use(cors(corsOptions));

//* view engine setup
app.set("views", path.join(__dirname, "views"));

app.use(logger("dev"));
app.use(express.json({ limit: "500mb" }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(compression({ threshold: 1024, level: 6 }));

//* routes initialize
app.use("/api/v1", usersRouter);
app.use("/api/v1", contactsRouter);
app.use("/api/v1", productRouter);
app.use("/api/v1", ordersRouter);
app.use("/api/v1", generativeAiRouter);
app.use("/api/v1", otpRouter);

app.use("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Amoree Scents",
  });
});

//* catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

//* error handler
app.use(errorMiddleware);

//* connectDB
connectDB();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = app;
