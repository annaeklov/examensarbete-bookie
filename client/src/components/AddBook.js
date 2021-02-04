import axios from "axios";

export function AddBook(clickedBookToAdd, activeTab, selectedBookclubId) {

  axios
    .put(`http://localhost:3000/addBook/${selectedBookclubId}`, {
      title: clickedBookToAdd.volumeInfo.title,
      author: clickedBookToAdd.volumeInfo.authors,
      genre: "no genre yet",
      coverSrc: clickedBookToAdd.volumeInfo.imageLinks.smallThumbnail,
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
