import axios from "axios";

export function RemoveBook(bookclubId, selectedTab, clickedBookId, setShowModal) {
  console.log("removeBook.js", bookclubId, selectedTab, clickedBookId);

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
