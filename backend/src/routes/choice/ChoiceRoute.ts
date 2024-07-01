import express from "express";
const router = express.Router();
import { getChoices } from "../../services/NodeService.js";

router.get("/choices-for/:parent_id", (req, res) => {
  const client = req.client;
  getChoices(client, req.params.parent_id, req.query.limit as string)
    .then((result) => {
      res.status(200).json({ data: result });
    })
    .catch((err: Error) => {
      console.log(err);
    });
});

export default router;
