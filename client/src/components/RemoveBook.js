import axios from "axios";

export function RemoveBook(
  bookclubId,
  selectedTab,
  clickedBookId,
  setShowModal
) {
  axios
    .put(`http://localhost:3000/removeBook/${bookclubId}`, {
      clickedBookId: clickedBookId,
      whereToRemoveBook: selectedTab,
    })
    .then((result) => {
      console.log(result.data);
      setShowModal(false);
    })
    .catch((err) => {
      console.log("Error from frontend-put", err);
    });
}

export function RemoveBookMove(
  previousList,
  bookclubId,
  clickedBook,
  setShowModal
) {
  axios
    .put(`http://localhost:3000/removeBook/${bookclubId}`, {
      clickedBookId: clickedBook.id,
      whereToRemoveBook: previousList,
    })
    .then((result) => {
      console.log(result.data);
      setShowModal(false);
    })
    .catch((err) => {
      console.log("Error from frontend-put-remove move", err);
    });
}
