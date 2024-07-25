import { Client } from "pg";
import express from "express";
import { getPinByUserByPage, togglePin } from "../../services/NodeService.js";
import { updatePinNote } from "../../services/pin/PinService.js";
const router = express.Router();

router.put("/update-note", async (req, res) => {
  const client = req.client;
  const { userId, pageId, note } = req.body;

  if (!userId || !pageId) {
    return res.status(400).send("Missing required fields");
  }

  try {
    const result = await updatePinNote(client, userId, pageId, note);
    res.status(200).json({ data: result });
  } catch (err) {
    console.error(err);
    res.status(500).send("update-note Error");
  }
});

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
    res.status(500).send("add-or-delete Error");
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
    res.status(500).send("by-user-by-page Error");
  }
});

export default router;
