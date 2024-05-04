const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const candidateRoutes = require("./routes/candidate");
const authRoutes = require("./routes/auth");
const helmet = require("helmet");
const compression = require("compression");
require('dotenv').config();


const app = express();

app.use(helmet());
app.use(compression());
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/candidate", candidateRoutes);
app.use("/auth", authRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

mongoose
  .connect(
    `${process.env.MONGODB_URI}/interviewDB`,
    { useNewUrlParser: true }
  )
  .then((result) => {
    app.listen(process.env.PORT || 8080);
    console.log("Connected")
  })
  .catch((err) => console.log(err));
