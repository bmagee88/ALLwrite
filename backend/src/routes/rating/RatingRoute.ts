import express from "express";
const router = express.Router();
import {
  getRatingByUserAndPage,
  updateUserRatingByUserIdAndPageId,
  insertUserRatingByUserIdAndPageId,
  avgRatingByPageId,
} from "../../services/NodeService";
import { Client } from "pg";

export default (client: Client) => {
  router.get("/user-rating-for-page/:user_id/:page_id", (req, res) => {
    getRatingByUserAndPage(client, parseInt(req.params.user_id), parseInt(req.params.page_id))
      .then((result) => {
        res.status(200).json({ data: result });
      })
      .catch((err: Error) => {
        console.log(err);
      });
  });
  router.put("/user-rating-for-page-update/:user_id/:page_id/:rating", (req, res) => {
    updateUserRatingByUserIdAndPageId(
      client,
      parseInt(req.params.user_id),
      parseInt(req.params.page_id),
      parseInt(req.params.rating)
    )
      .then((result) => {
        res.status(200).json({ data: result });
      })
      .catch((err: Error) => {
        console.log(err);
      });
  });

  router.post("/user-rating-for-page-insert/:user_id/:page_id/:rating", (req, res) => {
    insertUserRatingByUserIdAndPageId(
      client,
      parseInt(req.params.user_id),
      parseInt(req.params.page_id),
      parseInt(req.params.rating)
    )
      .then((result) => {
        res.status(200).json({ data: result });
      })
      .catch((err: Error) => {
        console.log(err);
      });
  });

  router.get("/avg-rating/:page_id", (req, res) => {
    // console.log("avg-rating page id", req.params.page_id);
    avgRatingByPageId(client, parseInt(req.params.page_id))
      .then((result) => {
        res.status(200).json({ data: result });
      })
      .catch((err: Error) => {
        console.log(err);
      });
  });
  return router;
};
