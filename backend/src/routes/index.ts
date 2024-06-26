import express from "express";
const router = express.Router();
import { query, validationResult } from "express-validator";

router.get("/", query("query").isNumeric(), query("value").isAlpha(), async (req, res) => {
  console.log("in router for /");
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ errors: result.array() });
  }
  console.log(result);
  if (req.query) {
    const { query: queryParam, value: valueParam } = req.query;
    console.log("query", queryParam);
    console.log("value", valueParam);
  }
  console.log("query.query", req.query?.query);
  console.log("query.value", req.query?.value);
  res.send("all good");
});

export default router;
