import express from "express";
import { upsertBookmark } from "../../services/NodeService.js";
const router = express.Router();

router.put("/upsert", (req, res) => {
  console.log("in /api/bookmark/upsert");
  const client = req.client;
  const { userId, coverId, pageId } = req.body;

  if (!userId || !coverId || !pageId) {
    return res.status(400).send("Missing required fields");
  }

  upsertBookmark(client, userId, coverId, pageId)
    .then((result) => {
      res.status(200).json({ data: result });
    })
    .catch((err: Error) => {
      console.log(err);
    });
});

export default router;
