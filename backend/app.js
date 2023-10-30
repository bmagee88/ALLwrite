const NodeService = require("./src/services/NodeService");
const express = require("express");
require("dotenv").config();
const dbManager = require("./src/utils/DBManager");
const { Client } = require("pg");

const { CoverDto } = require("./src/dtos/CoverDto.js");
const { PageDto } = require("./src/dtos/PageDto");
const { ReadDto } = require("./src/dtos/ReadDto");
const { UserDto } = require("./src/dtos/UserDto");

const cors = require("cors");
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

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "DELETE, PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  if ("OPTIONS" == req.method) {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/page/:page_id", (req, res) => {
  NodeService.getPageById(client, req.params.page_id)
    .then((result) => {
      res.status(200).json({ data: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/user-rating-for-page/:user_id/:page_id", (req, res) => {
  NodeService.getRatingByUserAndPage(
    client,
    parseInt(req.params.user_id),
    parseInt(req.params.page_id)
  )
    .then((result) => {
      res.status(200).json({ data: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.put(
  "/user-rating-for-page-update/:user_id/:page_id/:rating",
  (req, res) => {
    NodeService.updateUserRatingByUserIdAndPageId(
      client,
      parseInt(req.params.user_id),
      parseInt(req.params.page_id),
      parseInt(req.params.rating)
    )
      .then((result) => {
        res.status(200).json({ data: result });
      })
      .catch((err) => {
        console.log(err);
      });
  }
);

app.post(
  "/user-rating-for-page-insert/:user_id/:page_id/:rating",
  (req, res) => {
    NodeService.insertUserRatingByUserIdAndPageId(
      client,
      parseInt(req.params.user_id),
      parseInt(req.params.page_id),
      parseInt(req.params.rating)
    )
      .then((result) => {
        res.status(200).json({ data: result });
      })
      .catch((err) => {
        console.log(err);
      });
  }
);

app.post("/create-user", (req, res) => {
  const user = new UserDto(
    req.body.username,
    req.body.firstname,
    req.body.lastname,
    req.body.email,
    req.body.password
  );
  NodeService.createUser(client, user)
    .then((result) => {
      res.status(200).json({ data: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/avg-rating/:page_id", (req, res) => {
  // console.log("avg-rating page id", req.params.page_id);
  NodeService.avgRatingByPageId(client, parseInt(req.params.page_id))
    .then((result) => {
      res.status(200).json({ data: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/choices-for/:parent_id", (req, res) => {
  NodeService.getChoices(client, req.params.parent_id, req.query.limit)
    .then((result) => {
      res.status(200).json({ data: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/create-cover", (req, res) => {
  // console.log("body", req.body);
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

app.post("/read", (req, res) => {
  //validate
  let read = new ReadDto(req.body.user_id, req.body.page_id);
  NodeService.readPage(client, read)
    .then((result) => {
      res.status(200).json({ data: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/login", (req, res) => {
  //validate
  NodeService.login(client, req.body.username, req.body.password)
    .then((result) => {
      res.status(200).json({ data: result });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ data: "invalid" });
    });
});

app.get("/is-username-taken/:username", (req, res) => {
  NodeService.isUsernameTaken(client, req.params.username)
    .then((result) => {
      res.status(200).json({ data: result });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ data: "server error" });
    });
});

app.post("/create-page-for/:parent_id", (req, res) => {
  // console.log("param value of pid", req.params.parent_id);

  let adjusted_pid = null;
  let adjusted_prompt = null;

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
  NodeService.createPage(client, page)
    .then((result) => {
      res.json({ data: result });
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

app.get("/cover-details/:id", (req, res) => {
  NodeService.getCoverById(client, req.params.id)
    .then((result) => {
      res.status(200).json({ data: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/cover-by/:page_id", (req, res) => {
  // console.log("page id at endpoint", req.params.page_id);
  NodeService.getCoverByPageId(client, req.params.page_id)
    .then((result) => {
      res.status(200).json({ data: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/page-is-read", (req, res) => {
  // console.log(
  //   "page is read query info:",
  //   parseInt(req.query.page_id),
  //   parseInt(req.query.user_id)
  // );
  NodeService.getIfPageRead(
    client,
    parseInt(req.query.page_id),
    parseInt(req.query.user_id)
  )
    .then((result) => {
      res.status(200).json({ data: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/author-choices", (req, res) => {
  NodeService.getAuthorChildForPage(
    client,
    req.query.author,
    req.query.parent_id
  )
    .then((result) => {
      res.status(200).json({ data: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/rating-choices", (req, res) => {
  NodeService.getHighestRatingChoices(client, req.query.parent_id)
    .then((result) => {
      res.status(200).json({ data: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/longest-stories", (req, res) => {
  NodeService.getLongestStoryChoicesFrom(client, req.query.page_id)
    .then((result) => {
      res.status(200).json({ data: result });
    })
    .catch((err) => {
      console.log(err);
    });
});
