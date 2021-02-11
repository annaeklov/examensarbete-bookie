import axios from "axios";

export function AddBook(clickedBookToAdd, activeTab, selectedBookclubId) {
  let bookCover;

  if (clickedBookToAdd.volumeInfo.imageLinks) {
    bookCover = clickedBookToAdd.volumeInfo.imageLinks.smallThumbnail;
  } else
    bookCover =
      "https://i.pinimg.com/564x/e3/d7/28/e3d7285312255ce4bfb866479f0705c4.jpg";

  axios
    .put(`http://localhost:3000/addBook/${selectedBookclubId}`, {
      title: clickedBookToAdd.volumeInfo.title,
      author: clickedBookToAdd.volumeInfo.authors,
      genre: "no genre yet",
      coverSrc: bookCover,
      id: clickedBookToAdd.id,
      whereToAddBook: activeTab,
    })
    .then((result) => {
      console.log(result.data);
    })
    .catch((err) => {
      console.log("Error from frontend-put", err);
    });
}

export function AddBookMove(clickedBook, selectedOptionMove, bookclubId) {
  axios
    .put(`http://localhost:3000/addBook/${bookclubId}`, {
      title: clickedBook.title,
      author: clickedBook.author,
      genre: "no genre yet",
      coverSrc: clickedBook.coverSrc,
      id: clickedBook.id,
      whereToAddBook: selectedOptionMove,
    })
    .then((result) => {
      console.log(result.data); //Success
    })
    .catch((err) => {
      console.log("Error from frontend-put", err);
    });
}
