import express from "express";
const router = express.Router();
import { login, isUsernameTaken } from "../../services/NodeService.js";
import { Client } from "pg";

router.post("/login", (req, res) => {
  const client = req.client;
  //validate
  console.log("/login");
  console.log(`un+pw ${req.body.username}, ${req.body.password}`);
  login(client, req.body.username, req.body.password)
    .then((result) => {
      res.status(200).json({ data: result });
    })
    .catch((err: Error) => {
      console.log(err);
      res.status(400).json({ data: "invalid" });
    });
});
router.get("/is-username-taken/:username", (req, res) => {
  const client = req.client;
  isUsernameTaken(client, req.params.username)
    .then((result) => {
      res.status(200).json({ data: result });
    })
    .catch((err: Error) => {
      console.log(err);
      res.status(500).json({ data: "server error" });
    });
});

export default router;
