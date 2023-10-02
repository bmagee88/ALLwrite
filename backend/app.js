const NodeService = require("./src/services/NodeService");
const express = require("express");
require('dotenv').config();
const dbManager = require("./src/utils/DBManager");
const { Client } = require("pg");
const cors = require("cors");
const { CoverDto } = require("./src/dtos/CoverDto.js");

const app = express();

const bodyParser = require("body-parser");

const SERVER_PORT = 8000;

const client = new Client({
  host: process.env.HOST,
  user: process.env.USER,
  port: process.env.PORT,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});
client.connect();

app.listen(SERVER_PORT, () => {
  console.log("listening...");
});

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/create-cover", (req, res) => {
  console.log("got in create-cover endpoint");
  console.log("body", req.body);
  //validate
  let cover = new CoverDto(
    req.body.title,
    req.body.author,
    req.body.genre,
    req.body.summary,
    req.body.first_page
  );
  NodeService.createCover(client, cover)
    .then((result) => {
      res.status(200).json({ data: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/bookmarks/:user_id", (req, res) => {
  NodeService.getBookmarksByUserId(client, req.params.user_id)
    .then((result) => {
      res.status(200).json({ data: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/covers", (req, res) => {
  NodeService.getCovers(client, req.query.limit)
    .then((result) => {
      res.status(200).json({ data: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/cover-details/:id", (req, res)=>{
  NodeService.getCoverById(client, req.params.id)
  .then((result) => {
    res.status(200).json({ data: result });
  })
  .catch((err) => {
    console.log(err);
  });
})

app.get("/author-choices", (req, res) => {
  NodeService.getAuthorChildForPage(client, res.body.author, 4)
    .then((result) => {
      res.status(200).json({ data: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/rating-choices", (req, res) => {
  NodeService.getHighestRatingChoices(client, 4)
    .then((result) => {
      res.status(200).json({ data: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/longest-story", (req, res) => {
  NodeService.getLongestStoryChoicesFrom(client, 2)
    .then((result) => {
      res.status(200).json({ data: result });
    })
    .catch((err) => {
      console.log(err);
    });
});
