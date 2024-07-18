import express from "express";
import { addCoverIdsToPages } from "../../services/NodeService.js";
const router = express.Router();

router.put("/add-coverid-to-pages", (req, res) => {
  console.log("in /add-coverid-to-pages");
  const client = req.client;

  addCoverIdsToPages(client)
    .then((result) => {
      res.status(200).json({ data: result });
    })
    .catch((err: Error) => {
      console.log(err);
    });
});

export default router;
