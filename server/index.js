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

app.post("/login", async (req, res) => {
  let user = req.body;
  if (!user.username.length && !user.password.length) {
    res.status(400).end();
  }
  const data = await db.getUser(user);
  console.log("data", data);

  if (data.password === user.password) {
    res.status(201).send({ data });
  } else {
    res.status(400).end("Wrong password");
  } 
});

// Anropen till db.js görs här, ex:

/*  app.get("/lists", async (req, res) => {
  const data = await db.getAllLists();
  if (data) {
    res.status(200).send(data); // här är svaret, alltså alla listor
  } else {
    res.status(500).end();
  }
}); */

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
