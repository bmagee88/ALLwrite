import express from "express";
const router = express.Router();
import { getChoices } from "../../services/NodeService";
import { Client } from "pg";

export default (client: Client) => {
  router.get("/choices-for/:parent_id", (req, res) => {
    getChoices(client, req.params.parent_id, req.query.limit)
      .then((result) => {
        res.status(200).json({ data: result });
      })
      .catch((err: Error) => {
        console.log(err);
      });
  });
  return router;
};
