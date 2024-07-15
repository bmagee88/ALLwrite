import { Client } from "pg";
import express from "express";
import { getPinByUserByPage, togglePin } from "../../services/NodeService.js";
const router = express.Router();
router.put("/add-or-delete", async (req, res) => {
  const client = req.client;
  const { userId, pageId } = req.body;

  if (!userId || !pageId) {
    return res.status(400).send("Missing required fields");
  }

  try {
    const result = await togglePin(client, userId, pageId);
    res.status(200).json({ data: result });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error");
  }
});

router.post("/by-user-by-page", async (req, res) => {
  console.log("in by user by page");
  const client = req.client;
  const { userId, pageId } = req.body;
  console.log(`userId: ${userId} pageId: ${pageId}`);

  if (!userId || !pageId) {
    return res.status(400).send("Missing required fields");
  }

  try {
    const result = await getPinByUserByPage(client, userId, pageId);
    console.log("result of getPinByUserByPage", result);
    res.status(200).json({ data: result });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error");
  }
});

export default router;
