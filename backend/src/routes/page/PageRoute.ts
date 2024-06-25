import express from "express";
const router = express.Router();
import {
  getPageById,
  readPage,
  createPage,
  getIfPageRead,
  getHighestRatingChoices,
  getLongestStoryChoicesFrom,
} from "../../services/NodeService";
import ReadDto from "../../dtos/ReadDto";
import PageDto from "../../dtos/PageDto";
import { Client } from "pg";

export default (client: Client) => {
  router.get("/page/:page_id", (req, res) => {
    getPageById(client, req.params.page_id)
      .then((result) => {
        res.status(200).json({ data: result });
      })
      .catch((err: Error) => {
        console.log(err);
      });
  });
  router.post("/read", (req, res) => {
    //validate
    let read = new ReadDto(req.body.user_id, req.body.page_id);
    readPage(client, read)
      .then((result) => {
        res.status(200).json({ data: result });
      })
      .catch((err: Error) => {
        console.log(err);
      });
  });

  router.post("/create-page-for/:parent_id", (req, res) => {
    // console.log("param value of pid", req.params.parent_id);

    let adjusted_pid = -1;
    let adjusted_prompt = "";

    if (parseInt(req.params.parent_id) !== 0) {
      adjusted_pid = parseInt(req.params.parent_id);
    }
    if (req.body.prompt !== 0) {
      // console.log("using non-null value (value passed in)");
      adjusted_prompt = "'" + req.body.prompt + "'";
    }
    let page = new PageDto(
      adjusted_pid,
      adjusted_prompt,
      req.body.body_text,
      parseInt(req.body.page_num),
      req.body.author
    );
    // console.log("page at endpoint", page);
    createPage(client, page)
      .then((result) => {
        res.json({ data: result });
      })
      .catch((err: Error) => {
        console.log(err);
      });
  });

  router.get("/page-is-read", (req, res) => {
    // console.log(
    //   "page is read query info:",
    //   parseInt(req.query.page_id),
    //   parseInt(req.query.user_id)
    // );
    getIfPageRead(
      client,
      parseInt(req.query.page_id as string),
      parseInt(req.query.user_id as string)
    )
      .then((result) => {
        res.status(200).json({ data: result });
      })
      .catch((err: Error) => {
        console.log(err);
      });
  });

  router.get("/rating-choices", (req, res) => {
    getHighestRatingChoices(client, req.query.parent_id)
      .then((result) => {
        res.status(200).json({ data: result });
      })
      .catch((err: Error) => {
        console.log(err);
      });
  });

  router.get("/longest-stories", (req, res) => {
    getLongestStoryChoicesFrom(client, req.query.page_id)
      .then((result) => {
        res.status(200).json({ data: result });
      })
      .catch((err: Error) => {
        console.log(err);
      });
  });
  return client;
};
