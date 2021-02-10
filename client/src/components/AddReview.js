import axios from "axios";

export function AddReview(
  bookclubId,
  clickedBookId,
  ratingInput,
  commentInput,
  usernameInput
) {
  axios
    .put(`http://localhost:3000/addReview/${bookclubId}`, {
      id: clickedBookId,

      username: usernameInput,
      comment: commentInput,
      rating: ratingInput,
    })
    .then((result) => {
      console.log(result.data);
    })
    .catch((err) => {
      console.log("Error from frontend-put", err);
    });
}
