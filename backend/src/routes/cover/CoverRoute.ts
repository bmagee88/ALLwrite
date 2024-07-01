import express from "express";
const router = express.Router();
import {
  createCover,
  getBookmarksByUserId,
  getCovers,
  getCoverById,
  getCoverByPageId,
  getAuthorChildForPage,
} from "../../services/NodeService.js";
import CoverDto from "../../dtos/CoverDto.js";

export const testing = "testing";

router.use("/", (req, res, next) => {
  console.log("in cover Routes");
  next();
});

router.post("/create-cover", (req, res) => {
  console.log("in create-cover");
  const client = req.client;
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

router.get("/bookmarks/:user_id", (req, res) => {
  const client = req.client;
  getBookmarksByUserId(client, req.params.user_id)
    .then((result) => {
      res.status(200).json({ data: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/covers", async (req, res) => {
  const client = req.client;
  console.log("/covers req.client", req.client);
  console.log("getting covers");
  getCovers(client, req.query.limit as string)
    .then((result) => {
      res.status(200).json({ data: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/cover-details/:id", (req, res) => {
  const client = req.client;
  getCoverById(client, req.params.id)
    .then((result) => {
      res.status(200).json({ data: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/cover-by/:page_id", (req, res) => {
  const client = req.client;
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
  const client = req.client;
  getAuthorChildForPage(client, req.query.author as string, req.query.parent_id as string)
    .then((result) => {
      res.status(200).json({ data: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

export default router;
