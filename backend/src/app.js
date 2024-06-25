const NodeService = require("./services/NodeService.js");
// const express = require("express");
import express from "express";

import db from "./database/postgres/db";
/**
 *    Routes
 */
const indexRouter = require("./routes/index")(db);
const usersRouter = require("./routes/users/UserRoute")(db);
const accessRouter = require("./routes/access/AccessRoute")(db);
const choiceRouter = require("./routes/choice/ChoiceRoute")(db);
const coverRouter = require("./routes/cover/CoverRoute")(db);
const pageRouter = require("./routes/page/PageRoute")(db);
const ratingRouter = require("./routes/rating/RatingRoute")(db);

const { createProxyMiddleware } = require("http-proxy-middleware");

const path = require("path");
require("dotenv").config();

const { CoverDto } = require("./dtos/CoverDto.js");
const { PageDto } = require("./dtos/PageDto.js");
const { ReadDto } = require("./dtos/ReadDto.js");

const cors = require("cors");
const helmet = require("helmet");
const app = express();

const bodyParser = require("body-parser");

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"], // Allow resources from the same origin
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"], // Allow inline scripts and eval
      styleSrc: ["'self'", "'unsafe-inline'"], // Allow inline styles
      connectSrc: ["self", "http://localhost:8080"],
      // Add more directives as needed
    },
  })
);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "DELETE, PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  if ("OPTIONS" == req.method) {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.use(
//   "/api",
//   createProxyMiddleware({
//     target: "http://localhost:8000/api",
//     changeOrigin: true,
//     pathRewrite: {
//       "^/api": "", // Remove the /api prefix when forwarding the request
//     },
//   })
// );

// app.use(express.static(path.join(__dirname, "build")));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "build", "index.html"));
// });

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/access", accessRouter);
app.use("/choice", choiceRouter);
app.use("/cover", coverRouter);
app.use("/page", pageRouter);
app.use("/rating", ratingRouter);

app.listen(process.env.SERVER_PORT, () => {
  console.log(`listening on port ${process.env.SERVER_PORT}...`);
});
