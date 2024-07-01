import express from "express";
const router = express.Router();
import {
  getRatingByUserAndPage,
  updateUserRatingByUserIdAndPageId,
  insertUserRatingByUserIdAndPageId,
  avgRatingByPageId,
} from "../../services/NodeService.js";
import { Client } from "pg";

router.get("/user-rating-for-page/:user_id/:page_id", (req, res) => {
  const client = req.client;
  getRatingByUserAndPage(client, req.params.user_id, req.params.page_id)
    .then((result) => {
      res.status(200).json({ data: result });
    })
    .catch((err: Error) => {
      console.log(err);
    });
});
router.put("/user-rating-for-page-update/:user_id/:page_id/:rating", (req, res) => {
  const client = req.client;
  updateUserRatingByUserIdAndPageId(
    client,
    req.params.user_id,
    req.params.page_id,
    req.params.rating
  )
    .then((result) => {
      res.status(200).json({ data: result });
    })
    .catch((err: Error) => {
      console.log(err);
    });
});

router.post("/user-rating-for-page-insert/:user_id/:page_id/:rating", (req, res) => {
  const client = req.client;
  insertUserRatingByUserIdAndPageId(
    client,
    req.params.user_id,
    req.params.page_id,
    req.params.rating
  )
    .then((result) => {
      res.status(200).json({ data: result });
    })
    .catch((err: Error) => {
      console.log(err);
    });
});

router.get("/avg-rating/:page_id", (req, res) => {
  const client = req.client;
  // console.log("avg-rating page id", req.params.page_id);
  avgRatingByPageId(client, req.params.page_id)
    .then((result) => {
      res.status(200).json({ data: result });
    })
    .catch((err: Error) => {
      console.log(err);
    });
});

export default router;
