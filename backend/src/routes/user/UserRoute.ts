import express from "express";
const router = express.Router();
import Client from "pg/lib/client";
import { createUser } from "../../services/NodeService";
import UserDto from "../../dtos/UserDto";

export default (client: Client) => {
  router.post("/create-user", (req, res) => {
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
  return router;
};
