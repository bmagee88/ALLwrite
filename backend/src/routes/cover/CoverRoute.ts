import express from "express";
const router = express.Router();
import {
  createCover,
  getBookmarksByUserId,
  getCovers,
  getCoverById,
  getCoverByPageId,
  getAuthorChildForPage,
} from "../../services/NodeService";
import CoverDto from "../../dtos/CoverDto";
import { Client } from "pg";

export default (client: Client) => {
  router.post("/create-cover", (req, res) => {
    // console.log("body", req.body);
    //validate
    let cover = new CoverDto(
      req.body.title,
      req.body.author,
      req.body.genre,
      req.body.summary,
      req.body.first_page
    );
    createCover(client, cover)
      .then((result) => {
        res.status(200).json({ data: result });
      })
      .catch((err: Error) => {
        console.log(err);
      });
  });

  router.get("/api/bookmarks/:user_id", (req, res) => {
    getBookmarksByUserId(client, req.params.user_id)
      .then((result) => {
        res.status(200).json({ data: result });
      })
      .catch((err) => {
        console.log(err);
      });
  });

  router.get("/api/covers", (req, res) => {
    console.log("getting covers");
    getCovers(client, req.query.limit)
      .then((result) => {
        res.status(200).json({ data: result });
      })
      .catch((err) => {
        console.log(err);
      });
  });

  router.get("/cover-details/:id", (req, res) => {
    getCoverById(client, req.params.id)
      .then((result) => {
        res.status(200).json({ data: result });
      })
      .catch((err) => {
        console.log(err);
      });
  });

  router.get("/cover-by/:page_id", (req, res) => {
    // console.log("page id at endpoint", req.params.page_id);
    getCoverByPageId(client, req.params.page_id)
      .then((result) => {
        res.status(200).json({ data: result });
      })
      .catch((err) => {
        console.log(err);
      });
  });

  router.get("/author-choices", (req, res) => {
    getAuthorChildForPage(client, req.query.author, req.query.parent_id)
      .then((result) => {
        res.status(200).json({ data: result });
      })
      .catch((err) => {
        console.log(err);
      });
  });
  return router;
};
