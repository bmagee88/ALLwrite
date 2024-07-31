import { Router } from "express";
import { emotionMod } from "./utils.js";
import { getModifiedPrompt } from "../../services/openAi/openAiService.js";

const router = Router();

router.post("/", async (req, res) => {
  const { text, mod } = req.body;
  const textPrompt = text;
  const modPrompt = emotionMod(mod);
  const fullPrompt = textPrompt + " " + modPrompt;
  try {
    const promptResponse = await getModifiedPrompt(fullPrompt);
    res.status(200).json(promptResponse);
  } catch (err) {
    res.status(500).json({ data: "something went wrong", error: err });
  }
});

export default router;
