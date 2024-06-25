import express from "express";
import Client from "pg/lib/client";
const router = express.Router();
const { query, validationResult } = require("express-validator");

export default (client: Client) => {
  router.get("/", query("query").isNumeric(), query("value").isAlpha(), (req, res) => {
    const result = validationResult(req);
    console.log(result);
    const {
      query: { query, value },
    } = req;
    console.log("query", query);
    console.log("value", value);
    res.send("all good");
  });
  return router;
};
