import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useHistory, Redirect, NavLink, useParams } from "react-router-dom";

function RenderBooks({ bookClubInfo }) {
  const [selectedTab, setSelectedTab] = useState("read");

  let mappedBooks;

  if (bookClubInfo.booksRead) {
    if (selectedTab === "read") {
      mappedBooks = bookClubInfo.booksRead.map((readBook, x) => {
        return <Img src={readBook.coverSrc} key={x} alt={readBook.title} />;
      });
    }
  }
  if (bookClubInfo.booksToRead) {
    if (selectedTab === "toRead") {
      mappedBooks = bookClubInfo.booksToRead.map((readToBook, x) => {
        return <Img src={readToBook.coverSrc} key={x} alt={readToBook.title} />;
      });
    }
  }
  if (bookClubInfo.currentlyReading) {
    if (selectedTab === "currently") {
      mappedBooks = <Img src={bookClubInfo.currentlyReading.coverSrc} alt={bookClubInfo.currentlyReading.title} />;
    }
  }

  function changeTab(e) {
    setSelectedTab(e.target.value);
  }
  return (
    <>
      <Tabs>
        <button value="read" onClick={changeTab} autoFocus>
          READ
        </button>
        <button value="toRead" onClick={changeTab}>
          TO READ
        </button>
        <button value="currently" onClick={changeTab}>
          CURRENTLY
        </button>
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
  justify-content: space-between;
  padding: 10px 5px 0 5px;
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
  padding: 10px 0 0 0;

  button {
    border: none;
    color: #262824;
    background-color: transparent;
    :active,
    :focus {
      border: none;
      border-bottom: 2px solid #262824;
      outline: none;
      font-weight: bold;
    }
  }
`;
