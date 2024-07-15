import express from "express";
const router = express.Router();
import { createUser, getContinueReadingByUserId } from "../../services/NodeService.js";
import UserDto from "../../dtos/UserDto.js";

router.post("/create-user", (req, res) => {
  const client = req.client;
  const user = new UserDto(
    req.body.username,
    req.body.firstname,
    req.body.lastname,
    req.body.email,
    req.body.password
  );
  createUser(client, user)
    .then((result) => {
      res.status(200).json({ data: result });
    })
    .catch((err: Error) => {
      console.log(err);
    });
});

router.get("/:user_id/continue-reading", async (req, res) => {
  console.log("in continue-reading endpoint");
  const user_id = parseInt(req.params.user_id);
  if (!user_id) {
    console.log("bad user id format");
    res.status(400).json({ data: "bad user id format" });
    return;
  }
  const client = req.client;
  try {
    const dbResult = await getContinueReadingByUserId(client, user_id);
    res.status(200).json({ data: dbResult });
  } catch (err) {
    console.log(err);
  }
});

export default router;
