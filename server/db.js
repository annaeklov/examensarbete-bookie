const mongo = require("mongodb");
const MongoClient = mongo.MongoClient;
const ObjectId = mongo.ObjectId;
// Connection URL
// Ska ofta (alltid) vara denna url
const url = "mongodb://localhost:27017";

const DBname = "bookieDB";
// Create a new MongoClient

const client = new MongoClient(url, { useUnifiedTopology: true });
client.connect();
let db = client.db(DBname);

/* Funktionerna ska göras här, som kallas på med anrop från server/index.js */

async function getUser(user) {
  console.log("inside")
  try {
    const result = await db
      .collection("usersCollection")
      .findOne({ username: user.username });

    return result;
  } catch {
    throw error;
  }
}

module.exports.getUser = getUser;

