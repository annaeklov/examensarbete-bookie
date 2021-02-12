import React, { useState } from "react";
import styled from "styled-components";
import { GrClose } from "react-icons/gr";
import { useParams } from "react-router-dom";
import { RemoveBook } from "./RemoveBook.js";
import AddModal from "./AddModal";
import DropdownMove from "./DropdownMove";
import AddReviewModal from "./AddReviewModal";

function BookModal({
  setShowModal,
  showModal,
  clickedBook,
  selectedTab,
  bookClubInfo,
  userInfo,
}) {
  const [selectedOptionMove, setSelectedOptionMove] = useState(selectedTab);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showAddReviewModal, setShowAddReviewModal] = useState(false);

  const { id } = useParams();
  let bookclubId = id;
  let clickedBookId = clickedBook.id;
  let mappedReviews;
  let options = [
    { label: "Have read", value: "booksRead" },
    { label: "Want to read", value: "booksToRead" },
    { label: "Currently reading", value: "currentlyReading" },
  ];

  if (clickedBook.reviews) {
    mappedReviews = clickedBook.reviews.map((review, x) => {
      if (review.username) {
        return (
          <div className="oneReviewDiv" key={x}>
            <blockquote>
              {review.comment}{" "}
              <span className="username">-{review.username} </span>
              <span className="rating">{review.rating}/5</span>
            </blockquote>
          </div>
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
        <button className="btn" onClick={() => setShowDropdown(!showDropdown)}>
          Move to...
        </button>
        {showDropdown && (
          <DropdownMove
            options={options}
            selectedOptionMove={selectedOptionMove}
            onSelectedChange={setSelectedOptionMove}
            previousList={selectedTab}
            bookclubId={bookclubId}
            setShowDropdown={setShowDropdown}
            clickedBook={clickedBook}
            setShowModal={setShowModal}
          />
        )}
      </TopDiv>
      <Section>
        {selectedTab === "booksRead" && (
          <span className="selectedTab">
            In <u>have read</u>-list
          </span>
        )}
        {selectedTab === "booksToRead" && (
          <span className="selectedTab">
            In <u>want to read</u>-list
          </span>
        )}
        {selectedTab === "currentlyReading" && (
          <span className="selectedTab">
            In <u>currently reading</u>
          </span>
        )}
        <img src={clickedBook.coverSrc} alt={clickedBook.title} />
        <BookInfoDiv>
          <h3 className="bookInfoText title">
            {clickedBook.title.toUpperCase()}
          </h3>
          {clickedBook.author ? (
            <h4 className="bookInfoText authorGenre">
              -
              {clickedBook.author.map((oneAuthor) => {
                return oneAuthor.toUpperCase();
              })}
            </h4>
          ) : (
            <h4 className="bookInfoText authorGenre">- no author ...</h4>
          )}
          {clickedBook.genre ? (
            <h4 className="bookInfoText authorGenre genre">
              {" "}
              {clickedBook.genre}
            </h4>
          ) : (
            <h4 className="bookInfoText authorGenre genre">
              {" "}
              no genres ...
            </h4>
          )}

          {clickedBook.reviews && (
            <ReviewsDiv>
              <h4 className="bookInfoText review">REVIEWS</h4>
              {selectedTab === "booksRead" && (
                <>
                  {" "}
                  <div className="mappedReviewsDiv">{mappedReviews}</div>
                  {showAddReviewModal ? (
                    <AddReviewModal
                      bookclubId={bookclubId}
                      clickedBookId={clickedBookId}
                      setShowAddReviewModal={setShowAddReviewModal}
                    />
                  ) : (
                    <button onClick={() => setShowAddReviewModal(true)}>
                      Add review
                    </button>
                  )}
                </>
              )}
            </ReviewsDiv>
          )}
        </BookInfoDiv>{" "}
        <button
          className="delBtn"
          onClick={() => {
            onClickRemoveBook(
              bookclubId,
              selectedTab,
              clickedBookId,
              setShowModal
            );
          }}
        >
          Delete book
        </button>
      </Section>
    </ModalDiv>
  );
}
export default BookModal;

const ReviewsDiv = styled.div`
  margin-bottom: 20px;
  h4 {
    margin: 5px;
  }
  button {
    border: 1px solid grey;
    border-radius: 5px;
    width: 82px;
    height: 23px;
    background-color: transparent;
    color: #262824;
    box-shadow: 2px 0px 4px lightgrey;
    margin-bottom: 5px;
    :active,
    :focus {
      outline: none;
    }
  }
  .mappedReviewsDiv {
    @import url("https://fonts.googleapis.com/css2?family=PT+Mono&display=swap");
    font-family: "PT Mono", monospace;
    width: 100%;
    padding: 3px;
    .oneReviewDiv {
      border: 1 solid red;
      width: 100%;
      margin: 5px;
      blockquote {
        font-size: 16px;
        position: relative;
        margin: 0;
        padding: 16px;
        text-transform: lowercase;
        :after {
          position: absolute;
          color: lightgrey;
          font-size: 60px;
          width: 30px;
          height: 30px;
          content: "“";
          left: -8px;
          top: -6px;
        }
      }
      .username {
        font-size: small;
        font-style: italic;
      }
      .rating {
        font-size: small;
      }
    }
  }
`;

const BookInfoDiv = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  .bookInfoText {
  }
  .title {
    font-size: 16px;
    margin: 20px 0 5px 0;
    font-weight: 800;
  }
  .authorGenre {
    margin: 0 0 10px 5px;
    font-weight: 200;
  }
  .genre {
    margin: 0 0 16px 12px;
    font-style: italic;
  }
  .review {
    font-weight: 600;
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
  background-color: #ecece6;
  padding: 10px;
  box-sizing: border-box;
  z-index: 1;
  overflow: auto;
  .delBtn {
    margin-top: 100px;
    border: 1px solid #7f7f7c;
    border-radius: 5px;
    width: 79px;
    height: 20px;
    background-color: lightcoral;
    font-size: 12px;
    color: #262824;
    box-shadow: 2px 0px 4px lightgrey;
    align-self: flex-end;
    :active,
    :focus {
      outline: none;
    }
  }
`;
const TopDiv = styled.div`
  margin: 10px 0 0 0;
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
    border: 1px solid grey;
    border-radius: 5px;
    width: 60px;
    height: 40px;
    box-shadow: 2px 0px 4px lightgrey;
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
  justify-content: space-between;
  .selectedTab {
    font-weight: 200;
    margin: 10px 0px 12px 0px;
  }
  img {
    width: 180px;
    height: 280px;
    border-radius: 15px 0 0 10px;
    filter: drop-shadow(4px -2px 7px grey);
  }
`;
