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
  try {
    const result = await db
      .collection("usersCollection")
      .findOne({ username: user.username });
    return result;
  } catch {
    throw error;
  }
}

async function getUser(userId) {
  try {
    const result = await db
      .collection("usersCollection")
      .findOne({ _id: ObjectId(userId) });
    return result;
  } catch {
    throw error;
  }
}

async function getBookclubs() {
  try {
    const result = await db.collection("bookclubsCollection").find().toArray();

    return result;
  } catch {
    throw error;
  }
}

async function getBookclub(bookclubId) {
  try {
    const result = await db
      .collection("bookclubsCollection")
      .findOne({ _id: ObjectId(bookclubId) });

    return result;
  } catch {
    throw error;
  }
}

//--------PUT----------//

async function updateBookclub(newBook, bookclubId, whereToAddBook) {
  var $push_query = {};
  $push_query[whereToAddBook] = newBook;
  console.log("add db", $push_query[whereToAddBook]);

  try {
    const result = await db.collection("bookclubsCollection").updateOne(
      { _id: ObjectId(bookclubId) },
      {
        $push: $push_query,
      }
    );
    return result;
  } catch {
    throw error;
  }
}

async function updateBookclubAddReview(
  newReview,
  bookclubId
) {
  try {
    const result = await db.collection("bookclubsCollection").updateOne(
      {
        _id: ObjectId(bookclubId),
        "booksRead.id": newReview.id,
      },
      {
        $push: { "booksRead.$.reviews": newReview.reviews },
      }
    );
    return result;
  } catch {
    throw error;
  }
}

async function updateBookclubRemoveBook(
  removeBook,
  bookclubId,
  whereToRemoveBook
) {
  var $pull_query = {};
  $pull_query[whereToRemoveBook] = removeBook;
  console.log("removeBook", {
    $pull: $pull_query,
  });

  try {
    const result = await db.collection("bookclubsCollection").updateMany(
      { _id: ObjectId(bookclubId) },
      {
        $pull: $pull_query,
      },
      true
    );
    return result;
  } catch {
    throw error;
  }
}

module.exports.getUser = getUser;
module.exports.loginUser = loginUser;
module.exports.getBookclubs = getBookclubs;
module.exports.getBookclub = getBookclub;
module.exports.updateBookclub = updateBookclub;
module.exports.updateBookclubRemoveBook = updateBookclubRemoveBook;
module.exports.updateBookclubAddReview = updateBookclubAddReview;

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
