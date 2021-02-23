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
      <Form onSubmit={handleSubmit}>
        <div>
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
          </label>{" "}
          <label>
            <p>
              Rating: {ratingInput ? ratingInput : <span>0</span>}
              <span>/5</span>
            </p>
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
          </label>
        </div>
        <label>
          <p>Comment</p>
          <textarea
            name="comment"
            placeholder="Write a comment"
            onChange={handleChangeComment}
            value={commentInput}
            type="text"
          />
        </label>
        <input className="btnInForm" type="submit" value="Add review" />
      </Form>
    </>
  );
}
export default AddReviewModal;

const Form = styled.form`
  display: flex;
  border: 1px solid grey;
  flex-direction: column;
  padding: 5px;
  border-radius: 3px;
  margin-bottom: 10px;
  div {
    display: flex;
  }
  label {
    margin: 3px;
    input[type="text"] {
      padding: 5px;
      border: none;
      border-bottom: 1px solid grey;
      ::placeholder {
        font-size: 12px;
      }
      :focus {
        outline: none;
      }
    }
    input[type="range"] {
      :focus {
        outline: none;
      }
    }
    textarea {
      width: 97%;
      height: 45px;
      padding: 5px;
      border: none;
      border-bottom: 1px solid grey;
      :focus {
        outline: none;
      }
    }
    p,
    span {
      font-size: 14px;
      font-variant-caps: all-small-caps;
      margin: 2px 0;
    }
  }
  .btnInForm {
    border: 1px solid #262824;
    border-radius: 5px;
    width: 85px;
    height: 25px;
    background-color: transparent;
    box-shadow: 2px 0px 4px lightgrey;
    :active,
    :focus {
      outline: none;
    }
  }
`;
