const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// För att kunna använda funktioner i db/index.js
const db = require("./db");

const app = express();
const apiPort = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

//db.on("error", console.error.bind(console, "MongoDB connection error:"));

// Anropen till db.js görs här

app.post("/login", async (req, res) => {
  let user = req.body;
  if (!user.username.length && !user.password.length) {
    res.status(400).end();
  }
  const data = await db.loginUser(user);
  if (data.username === user.username) {
    if (data.password === user.password) {
      res.status(201).send({ userId: data._id });
    } else {
      console.log("res", res);
      res.status(400).end("Wrong password");
    }
  } else if (data.username !== user.username) {
    console.log("res", res);
    res.status(400).end("Wrong username");
  }
});

app.get("/user/:userId", async (req, res) => {
  let userId = req.params.userId;
  const data = await db.getUser(userId);
  if (data) {
    res.status(200).send(data);
  } else {
    res.status(500).end();
  }
});

app.get("/bookclubs", async (req, res) => {
  const data = await db.getBookclubs();
  if (data) {
    res.status(200).send(data);
  } else {
    res.status(500).end();
  }
});

app.get("/bookclub/:bookclubId", async (req, res) => {
  let bookclubId = req.params.bookclubId;
  const data = await db.getBookclub(bookclubId);
  if (data) {
    res.status(200).send(data);
  } else {
    res.status(500).end();
  }
});

app.put("/addBookToRead/:bookclubId", async (req, res) => {
  let bookclubId = req.params.bookclubId;
  console.log(bookclubId);

  if (!req.body.name) {
    return res.status(400).end();
  }

  // kommer vara newBook = req.body.data, är ett objekt som kommer från frontend
  let newBook = {
    title: "sagan om ringen",
    author: "jag",
    genre: "",
    coverSrc: "",
    id: "id från API",
  };
  const data = await db.updateBookclubBooksToRead(newBook, bookclubId);
  res.status(200).send("Sucess");
});

app.put("/addBookRead/:bookclubId", async (req, res) => {
  let bookclubId = req.params.bookclubId;
  console.log(bookclubId);

  if (!req.body.name) {
    return res.status(400).end();
  }

  // kommer vara newBook = req.body.data, är ett objekt som kommer från frontend
  let newBook = {
    name: "sagan om ringen",
    author: "jag",
    genre: "",
    coverSrc: "",
    id: "id från API",
    reviews: [{ username: "", comment: "", rating: 0 }],
  };
  const data = await db.updateBookclubBooksRead(newBook, bookclubId);
  res.status(200).send("Sucess");
});

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));

//----

/* app.post("/addBook/:bookclubId", async (req, res) => {
  let bookclubId = req.params.bookclubId;
  console.log(bookclubId);

  if (!req.body.title) {
    return res.status(400).end();
  }

  let newBook = {
    title: "ny bok",
    author: "pelle",
    coverSrc: "",
    genre: "Roman",
    bookclubId: bookclubId,
  };
  const data = await db.postBookToBookClub(newBook, bookclubId);
  res.status(200).send("Sucess");
}); */

/* app.get("/books/:bookclubId", async (req, res) => {
  let bookclubId = req.params.bookclubId;
  const data = await db.getAllBooksInOneBookclub(bookclubId);
  if (data) {
    res.status(200).send(data);
  } else {
    res.status(500).end();
  }
}); */
