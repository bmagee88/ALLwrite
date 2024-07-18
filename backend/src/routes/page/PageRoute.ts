import express from "express";
const router = express.Router();
import {
  getPageById,
  readPage,
  createPage,
  getIfPageRead,
  getHighestRatingChoices,
  getLongestStoryChoicesFrom,
  updatePageWithCoverId,
} from "../../services/NodeService.js";
import ReadDto from "../../dtos/ReadDto.js";
import PageDto from "../../dtos/PageDto.js";
// import Page from "../../entities/Page.entity.js";

router.put("/update-page-with-coverid", (req, res) => {
  const client = req.client;
  const { page_id, cover_id } = req.body;
  console.log("page, cover", page_id, cover_id);
  updatePageWithCoverId(client, page_id, cover_id)
    .then((result) => {
      res.status(200).json({ data: result });
    })
    .catch((err: Error) => {
      console.log(err);
    });
});

router.get("/page/:page_id", (req, res) => {
  const client = req.client;
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
  const client = req.client;
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
  console.log("in createpagefor parentid");
  const client = req.client;
  // console.log("param value of pid", req.params.parent_id);

  let adjusted_pid = null;
  let adjusted_prompt = null;

  if (parseInt(req.params.parent_id) !== 0) {
    adjusted_pid = parseInt(req.params.parent_id);
  }
  // if (req.body.prompt !== 0) {
  //   // console.log("using non-null value (value passed in)");
  //   adjusted_prompt = "'" + req.body.prompt + "'";
  // }
  let page = new PageDto(
    adjusted_pid,
    adjusted_prompt,
    req.body.body_text,
    parseInt(req.body.page_num),
    req.body.author,
    req.body.cover_id
  );
  console.log("page at before createing page");
  createPage(client, page)
    .then((result) => {
      console.log("returned from createPage");
      res.json({ data: result });
    })
    .catch((err: Error) => {
      console.log(err);
    });
});

router.get("/page-is-read", (req, res) => {
  const client = req.client;
  // console.log(
  //   "page is read query info:",
  //   parseInt(req.query.page_id),
  //   parseInt(req.query.user_id)
  // );
  getIfPageRead(client, req.query.page_id as string, req.query.user_id as string)
    .then((result) => {
      res.status(200).json({ data: result });
    })
    .catch((err: Error) => {
      console.log(err);
    });
});

router.get("/rating-choices", (req, res) => {
  const client = req.client;
  getHighestRatingChoices(client, req.query.parent_id as string)
    .then((result) => {
      res.status(200).json({ data: result });
    })
    .catch((err: Error) => {
      console.log(err);
    });
});

router.get("/longest-stories", (req, res) => {
  const client = req.client;
  getLongestStoryChoicesFrom(client, req.query.page_id as string)
    .then((result) => {
      res.status(200).json({ data: result });
    })
    .catch((err: Error) => {
      console.log(err);
    });
});

export default router;
