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

async function loginUser(user) {
  console.log("inside getUser");
  try {
    const result = await db
      .collection("usersCollection")
      .findOne({ username: user.username });

    return result;
  } catch {
    throw error;
  }
}

async function getBookclubs() {
  console.log("inside getBookclubs");
  try {
    const result = await db.collection("bookclubsCollection").find().toArray();

    return result;
  } catch {
    throw error;
  }
}

async function getBookclub(bookclubId) {
  console.log("inside getBookclub");
  try {
    const result = await db
      .collection("bookclubsCollection")
      .findOne({ _id: ObjectId(bookclubId) });

    return result;
  } catch {
    throw error;
  }
}

async function updateBookclubBooksToRead(newBook, bookclubId) {
  try {
    const result = await db.collection("bookclubsCollection").updateOne(
      { _id: ObjectId(bookclubId) },
      {
        $push: {
          booksToRead: newBook,
        },
      }
    );
    return result;
  } catch {
    throw error;
  }
}

async function updateBookclubBooksRead(newBook, bookclubId) {
  try {
    const result = await db.collection("bookclubsCollection").updateOne(
      { _id: ObjectId(bookclubId) },
      {
        $push: {
          booksRead: newBook,
        },
      }
    );
    return result;
  } catch {
    throw error;
  }
}

module.exports.loginUser = loginUser;
module.exports.getBookclubs = getBookclubs;
module.exports.getBookclub = getBookclub;
module.exports.updateBookclubBooksToRead = updateBookclubBooksToRead;
module.exports.updateBookclubBooksRead = updateBookclubBooksRead;




//module.exports.getAllBooksInOneBookclub = getAllBooksInOneBookclub;
//module.exports.postBookToBookClub = postBookToBookClub;

/* async function postBookToBookClub(newBook) {
  newBook.bookclubId = ObjectId(newBook.bookclubId);
  try {
    const result = await db.collection("booksCollection").insertOne(newBook);
    return { success: true, statusCode: 201 };
  } catch {
    throw error;
  }
} */

/* async function getAllBooksInOneBookclub(bookclubId) {
  try {
    const result = await db
      .collection("booksCollection")
      .find({ bookclubId: ObjectId(bookclubId) })
      .toArray();
    return result;
  } catch {
    throw error;
  }
} */