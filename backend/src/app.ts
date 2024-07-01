import express, { NextFunction, Request, Response } from "express";
import pg from "pg";
import cors from "cors";
import helmet from "helmet";
import bodyParser from "body-parser";
import { config } from "dotenv";
// import "./types";
import indexRouter from "./routes/index.js";
import userRouter from "./routes/user/UserRoute.js";
import accessRouter from "./routes/access/AccessRoute.js";
import choiceRouter from "./routes/choice/ChoiceRoute.js";
import coverRouter, { testing } from "./routes/cover/CoverRoute.js";
import pageRouter from "./routes/page/PageRoute.js";
import ratingRouter from "./routes/rating/RatingRoute.js";
config();
const dbconfig = {
  host: process.env.HOST,
  user: process.env.USER,
  port: parseInt(process.env.PORT as string),
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
};
const Client = new pg.Client(dbconfig);
console.log("client", Client);
const app = express();

console.log("test:", testing);

// import db from "./database/postgres/db";

/** start postgres client */
// const db = new Client({
//   host: process.env.HOST,
//   user: process.env.USER,
//   port: parseInt(process.env.PORT),
//   password: process.env.PASSWORD,
//   database: process.env.DATABASE,
// });
// db.connect();

if (typeof process.env.PASSWORD !== "string") {
  console.error("Password environment variable is not a string:", process.env.PASSWORD);
} else {
  console.log("Password is a valid string");
}

// Client.connect();

/** MiddleWare */

/** Resource sharing and Cors issues */
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      connectSrc: ["self", "http://localhost:8080"],
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

/** Body Parser and json */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const setClient = (req: Request, res: Response, next: NextFunction) => {
  req.client = Client;
  next();
};
/**
 *    Routes
 */
async function main() {
  try {
    // Connect to the MongoDB cluster
    await Client.connect();
    console.log("Connected to Postgres Client");

    app.use("/", (req, res, next) => {
      req.client = Client;
      console.log("Setting req.client globally");
      next();
    });

    app.use((req, res, next) => {
      console.log(`Received ${req.method} request for ${req.url}`);
      next();
    });
    // app.use("/", indexRouter);
    app.use("/api/users", userRouter);
    app.use("/api/access", accessRouter);
    app.use("/api/choice", choiceRouter);
    app.use("/api/cover", coverRouter);
    app.use("/api/page", pageRouter);
    app.use("/api/rating", ratingRouter);

    app.listen(process.env.SERVER_PORT, () => {
      console.log(`listening on port ${process.env.SERVER_PORT}...`);
    });
  } catch (e) {
    console.error(e);
  }
}

main().catch(console.error);

// })
// .catch((err) => {
//   console.error("Failed to connect to the database:", err);
// });
