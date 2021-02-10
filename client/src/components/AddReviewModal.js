import React, { useState } from "react";
import styled from "styled-components";
import { AddReview } from "./AddReview.js";

function AddReviewModal({ clickedBookId, bookclubId, setShowAddReviewModal }) {
  const [usernameInput, setUsernameInput] = useState("");
  const [commentInput, setCommentInput] = useState("");
  const [ratingInput, setRatingInput] = useState(0);

  function handleSubmit(e) {
    e.preventDefault();

    //ADD REVIEW ANROP
    AddReview(
      bookclubId,
      clickedBookId,
      ratingInput,
      commentInput,
      usernameInput
    );
    setShowAddReviewModal(false);
  }

  function handleChangeComment(e) {
    setCommentInput(e.target.value);
  }
  function handleChangeRating(e) {
    setRatingInput(e.target.value);
  }

  function handleChangeUsername(e) {
    setUsernameInput(e.target.value);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input
            name="username"
            placeholder="Write your name"
            onChange={handleChangeUsername}
            value={usernameInput}
            type="text"
            required
            autoFocus
          />
        </label>
        <label>
          <p>Comment</p>
          <textarea
            name="comment"
            placeholder="Write a comment"
            onChange={handleChangeComment}
            value={commentInput}
            type="text"
            required
          />
        </label>
        <label>
          <p>Rating (0-5)</p>
          <input
            name="rating"
            onChange={handleChangeRating}
            value={ratingInput}
            type="range"
            min="0"
            max="5"
            step="0.5"
          />
          <br />
          {ratingInput ? ratingInput : <span>0</span>}
          <span>/5</span>
        </label>
        <br />
        <input type="submit" value="Add review" />
      </form>
    </>
  );
}
export default AddReviewModal;
