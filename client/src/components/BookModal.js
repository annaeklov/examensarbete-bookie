import React from "react";
import styled from "styled-components";
import { GrClose } from "react-icons/gr";

function BookModal({ setShowModal, showModal, clickedBook }) {
  let mappedReviews;
  if (clickedBook.review) {
    mappedReviews = clickedBook.review.map((x) => {
      if (x.username) {
        console.log("tom review", x.username);
        return (
          <span>
            "{x.comments}" - {x.username}, {x.rating}/5
          </span>
        );
      }
    });
  }

  return (
    <ModalDiv>
      <TopDiv>
        <button onClick={() => setShowModal(false)}>
          <GrClose />
        </button>
      </TopDiv>
      <Section>
        <img src={clickedBook.coverSrc} alt={clickedBook.title} />
        <BookInfoDiv>
          <h3 className="bookInfoText title">{clickedBook.title}</h3>
          <h4 className="bookInfoText author">- {clickedBook.author}</h4>
          <p className="bookInfoText genre"> {clickedBook.genre}</p>
          {clickedBook.review ? (
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
  button {
    width: 50px;
    height: 30px;
    border: none;
    background-color: transparent;
    svg {
      font-size: 20px;
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
