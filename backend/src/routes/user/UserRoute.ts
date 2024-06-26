import express from "express";
const router = express.Router();
import { createUser } from "../../services/NodeService.js";
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

export default router;
