import React, { useState } from "react";
import styled from "styled-components";
import BookModal from "./BookModal";

function RenderBooks({ bookClubInfo, userInfo, showModal, setShowModal }) {
  const [selectedTab, setSelectedTab] = useState("booksRead");
  const [active, setActive] = useState("booksRead");
  const [clickedBook, setClickedBook] = useState({});

  let mappedBooks;

  if (userInfo) {
    if (userInfo.booksRead) {
      if (selectedTab === "booksRead") {
        mappedBooks = userInfo.booksRead.map((book, x) => {
          return (
            <ATag key={x} onClick={() => onClickATag(book)}>
              {book.coverSrc !==
              "https://i.pinimg.com/564x/e3/d7/28/e3d7285312255ce4bfb866479f0705c4.jpg" ? (
                <ImgContainer>
                  <Img src={book.coverSrc} alt={book.title} />
                </ImgContainer>
              ) : (
                <ImgContainer>
                  <Img src={book.coverSrc} alt={book.title} />
                  <div className="textOnImg">{book.title}</div>
                </ImgContainer>
              )}{" "}
            </ATag>
          );
        });
      }
    }

    if (userInfo.booksToRead) {
      if (selectedTab === "booksToRead") {
        mappedBooks = userInfo.booksToRead.map((book, x) => {
          return (
            <ATag key={x} onClick={() => onClickATag(book)}>
              {book.coverSrc !==
              "https://i.pinimg.com/564x/e3/d7/28/e3d7285312255ce4bfb866479f0705c4.jpg" ? (
                <ImgContainer>
                  <Img src={book.coverSrc} alt={book.title} />
                </ImgContainer>
              ) : (
                <ImgContainer>
                  <Img src={book.coverSrc} alt={book.title} />
                  <div className="textOnImg">{book.title}</div>
                </ImgContainer>
              )}{" "}
            </ATag>
          );
        });
      }
    }
    if (userInfo.currentlyReading) {
      if (selectedTab === "currentlyReading") {
        mappedBooks = userInfo.currentlyReading.map((book, x) => {
          return (
            <ATag key={x} onClick={() => onClickATag(book)}>
              {book.coverSrc !==
              "https://i.pinimg.com/564x/e3/d7/28/e3d7285312255ce4bfb866479f0705c4.jpg" ? (
                <ImgContainer>
                  <Img src={book.coverSrc} alt={book.title} />
                </ImgContainer>
              ) : (
                <ImgContainer>
                  <Img src={book.coverSrc} alt={book.title} />
                  <div className="textOnImg">{book.title}</div>
                </ImgContainer>
              )}{" "}
            </ATag>
          );
        });
      }
    }
  }

  if (bookClubInfo) {
    if (bookClubInfo.booksRead) {
      if (selectedTab === "booksRead") {
        mappedBooks = bookClubInfo.booksRead.map((book, x) => {
          return (
            <ATag key={x} onClick={() => onClickATag(book)}>
              {book.coverSrc !==
              "https://i.pinimg.com/564x/e3/d7/28/e3d7285312255ce4bfb866479f0705c4.jpg" ? (
                <ImgContainer>
                  <Img src={book.coverSrc} alt={book.title} />
                </ImgContainer>
              ) : (
                <ImgContainer>
                  <Img src={book.coverSrc} alt={book.title} />
                  <div className="textOnImg">{book.title}</div>
                </ImgContainer>
              )}{" "}
            </ATag>
          );
        });
      }
    }
    if (bookClubInfo.booksToRead) {
      if (selectedTab === "booksToRead") {
        mappedBooks = bookClubInfo.booksToRead.map((book, x) => {
          return (
            <ATag key={x} onClick={() => onClickATag(book)}>
              {book.coverSrc !==
              "https://i.pinimg.com/564x/e3/d7/28/e3d7285312255ce4bfb866479f0705c4.jpg" ? (
                <ImgContainer>
                  <Img src={book.coverSrc} alt={book.title} />
                </ImgContainer>
              ) : (
                <ImgContainer>
                  <Img src={book.coverSrc} alt={book.title} />
                  <div className="textOnImg">{book.title}</div>
                </ImgContainer>
              )}{" "}
            </ATag>
          );
        });
      }
    }
    if (bookClubInfo.currentlyReading) {
      if (selectedTab === "currentlyReading") {
        mappedBooks = bookClubInfo.currentlyReading.map((book, x) => {
          return (
            <ATag key={x} onClick={() => onClickATag(book)}>
              {book.coverSrc !==
              "https://i.pinimg.com/564x/e3/d7/28/e3d7285312255ce4bfb866479f0705c4.jpg" ? (
                <ImgContainer>
                  <Img src={book.coverSrc} alt={book.title} />
                </ImgContainer>
              ) : (
                <ImgContainer>
                  <Img src={book.coverSrc} alt={book.title} />
                  <div className="textOnImg">{book.title}</div>
                </ImgContainer>
              )}{" "}
            </ATag>
          );
        });
      }
    }
  }

  function changeTab(e) {
    setSelectedTab(e.target.value);
    setActive(e.target.value);
  }
  function onClickATag(bookInfo) {
    setShowModal(true);
    setClickedBook(bookInfo);
  }
  return (
    <>
      {showModal && (
        <BookModal
          showModal={showModal}
          setShowModal={setShowModal}
          clickedBook={clickedBook}
          selectedTab={selectedTab}
          bookClubInfo={bookClubInfo}
          userInfo={userInfo}
        />
      )}
      <Tabs>
        <Button
          active={active === "booksRead"}
          value="booksRead"
          onClick={changeTab}
          autoFocus
        >
          HAVE READ
        </Button>
        <Button
          active={active === "booksToRead"}
          value="booksToRead"
          onClick={changeTab}
        >
          WANT TO READ
        </Button>
        <Button
          active={active === "currentlyReading"}
          value="currentlyReading"
          onClick={changeTab}
        >
          CURRENTLY READING
        </Button>
      </Tabs>
      <BooksSection>
        {mappedBooks &&
          (mappedBooks.length > 0 ? (
            mappedBooks.reverse()
          ) : (
            <p>No books in this list..</p>
          ))}
      </BooksSection>
    </>
  );
}

export default RenderBooks;

const BooksSection = styled.section`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: unset;
  padding: 5px 5px 100px 5px;
  overflow: auto;
  height: 80vh;
`;

const ATag = styled.a`
  display: contents;
`;

const ImgContainer = styled.div`
  position: relative;
  text-align: center;
  width: 32%;
  height: 180px;
  .textOnImg {
    position: absolute;
    bottom: 3px;
    left: 8px;
    background-color: #bcbbb5;
    color: white;
    text-align: center;
    width: 88%;
    border-radius: 0 0 0 10px;
  }
`;

const Img = styled.img`
  box-sizing: border-box;
  width: 94%;
  height: 180px;
  padding: 10px 4px 4px 4px;
  border-radius: 15px 0px 0px 10px;
  filter: drop-shadow(4px -2px 7px grey);
`;

const Tabs = styled.nav`
  width: 100%;
  height: 20px;
  border-top: 1px solid lightgrey;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 10px 0 10px 0;
`;

const Button = styled.button`
  border: none;
  color: #262824;
  background-color: transparent;
  border-bottom: ${(props) => (props.active ? "2px solid #262824" : "")};
  outline: ${(props) => (props.active ? "none" : "")};
  font-weight: ${(props) => (props.active ? "bold" : "")};
`;
