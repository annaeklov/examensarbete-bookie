import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useHistory, Redirect, NavLink, useParams } from "react-router-dom";

function RenderBooks({ bookClubInfo, userInfo }) {
  const [selectedTab, setSelectedTab] = useState("read");
  const [active, setActive] = useState("read");

  let mappedBooks;

  function onClickATag(bookId) {
    console.log("klick", bookId);
  }

  if (userInfo) {
    if (userInfo.booksRead) {
      if (selectedTab === "read") {
        mappedBooks = userInfo.booksRead.map((book) => {
          return (
            <ATag onClick={() => onClickATag(book._id)}>
              <Img src={book.coverSrc} key={book._id} alt={book.title} />
            </ATag>
          );
        });
      }
    }
    if (userInfo.booksToRead) {
      if (selectedTab === "toRead") {
        mappedBooks = userInfo.booksToRead.map((book) => {
          return (
            <ATag onClick={() => onClickATag(book._id)}>
              <Img src={book.coverSrc} key={book._id} alt={book.title} />
            </ATag>
          );
        });
      }
    }
  }

  if (bookClubInfo) {
    if (bookClubInfo.booksRead) {
      if (selectedTab === "read") {
        mappedBooks = bookClubInfo.booksRead.map((book) => {
          return (
            <ATag onClick={() => onClickATag(book.id)}>
              <Img src={book.coverSrc} key={book.id} alt={book.title} />
            </ATag>
          );
        });
      }
    }
    if (bookClubInfo.booksToRead) {
      if (selectedTab === "toRead") {
        mappedBooks = bookClubInfo.booksToRead.map((book) => {
          return (
            <ATag onClick={() => onClickATag(book.id)}>
              <Img src={book.coverSrc} key={book.id} alt={book.title} />
            </ATag>
          );
        });
      }
    }
    if (bookClubInfo.currentlyReading) {
      if (selectedTab === "currently") {
        mappedBooks = (
          <ATag onClick={() => onClickATag(bookClubInfo.currentlyReading.id)}>
            <Img
              src={bookClubInfo.currentlyReading.coverSrc}
              alt={bookClubInfo.currentlyReading.title}
            />
          </ATag>
        );
      }
    }
  }

  function changeTab(e) {
    setSelectedTab(e.target.value);
    setActive(e.target.value);
  }
  return (
    <>
      <Tabs>
        <Button
          active={active === "read"}
          value="read"
          onClick={changeTab}
          autoFocus
        >
          READ
        </Button>
        <Button active={active === "toRead"} value="toRead" onClick={changeTab}>
          TO READ
        </Button>
        <Button
          active={active === "currently"}
          value="currently"
          onClick={changeTab}
        >
          CURRENTLY
        </Button>
      </Tabs>
      <BooksSection>{mappedBooks}</BooksSection>
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
`;

const ATag = styled.a`
  display: contents;
`;

const Img = styled.img`
  box-sizing: border-box;
  width: 32%;
  height: auto;
  padding: 10px 4px 4px 4px;
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
