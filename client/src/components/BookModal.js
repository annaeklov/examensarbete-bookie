import React, { useState } from "react";
import styled from "styled-components";
import { GrClose } from "react-icons/gr";
import { useParams } from "react-router-dom";
import { RemoveBook } from "./RemoveBook.js";

function BookModal({ setShowModal, showModal, clickedBook, selectedTab }) {
  const { id } = useParams();
  let bookclubId = id;
  let clickedBookId = clickedBook.id;

  let mappedReviews;
  if (clickedBook.reviews) {
    mappedReviews = clickedBook.reviews.map((review) => {
      if (review.username) {
        console.log("tom review", review.username);
        return (
          <span>
            "{review.comments}" - {review.username}, {review.rating}/5
          </span>
        );
      }
    });
  }

  function onClickRemoveBook(
    bookclubId,
    selectedTab,
    clickedBookId,
    setShowModal
  ) {
    RemoveBook(bookclubId, selectedTab, clickedBookId, setShowModal);
  }

  return (
    <ModalDiv>
      <TopDiv>
        <button onClick={() => setShowModal(false)}>
          <GrClose />
        </button>
        <button className="btn" onClick={() => console.log("click")}>
          Move book
        </button>
        <button
          className="btn"
          onClick={() => {
            onClickRemoveBook(
              bookclubId,
              selectedTab,
              clickedBookId,
              setShowModal
            );
          }}
        >
          Remove book
        </button>
      </TopDiv>
      <Section>
        {clickedBook.coverSrc ? (
          <img src={clickedBook.coverSrc} alt={clickedBook.title} />
        ) : (
          <img
            src={
              "https://www.brokensoulsrestored.com/wp-content/uploads/2018/07/book-cover.gif"
            }
            alt={clickedBook.title}
          />
        )}
        <BookInfoDiv>
          <h3 className="bookInfoText title">{clickedBook.title}</h3>
          <h4 className="bookInfoText author">- {clickedBook.author}</h4>
          <p className="bookInfoText genre"> {clickedBook.genre}</p>
          {clickedBook.reviews && clickedBook.reviews.length > 1 ? (
            <div>
              <p className="bookInfoText review">Reviews: </p>
              {mappedReviews}
            </div>
          ) : (
            <p className="bookInfoText review">No reviews yet</p>
          )}
        </BookInfoDiv>
      </Section>
    </ModalDiv>
  );
}
export default BookModal;

const BookInfoDiv = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  .bookInfoText {
  }
  .title {
    font-size: 35px;
    margin: 10px 0 5px 0;
  }
  .author {
    margin: 0 0 20px 5px;
  }
  .genre {
    margin: 0 0 20px 5px;
    font-style: italic;
  }
`;

const ModalDiv = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #e3e4db;
  padding: 10px;
  box-sizing: border-box;
  z-index: 1;
  overflow: auto;
`;
const TopDiv = styled.div`
  margin: 10px 0;
  display: flex;
  justify-content: space-between;
  button {
    width: 50px;
    height: 30px;
    border: none;
    background-color: transparent;
    svg {
      font-size: 20px;
    }
  }
  .btn {
    border: 1px solid black;
    border-radius: 5px;
    width: 60px;
    height: 40px;
    :active,
    :focus {
      outline: none;
    }
  }
`;
const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
  img {
    width: 250px;
    height: 350px;
  }
`;
