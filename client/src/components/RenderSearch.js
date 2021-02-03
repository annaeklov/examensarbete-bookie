import React from "react";
import styled from "styled-components";
import { BiBookAdd } from "react-icons/bi";

function RenderSearch({ booksArray }) {
  let mappedSearchedBooks;

  if (booksArray && booksArray.length >= 1) {
    mappedSearchedBooks = booksArray.map((searchedBook, x) => {
      return (
        <div key={searchedBook.id}>
          {searchedBook.volumeInfo.imageLinks && (
            <img
              src={searchedBook.volumeInfo.imageLinks.smallThumbnail}
              alt={searchedBook.volumeInfo.title}
            />
          )}
          <p>{searchedBook.volumeInfo.title} </p>
          {searchedBook.volumeInfo.authors && (
            <ul>
              {searchedBook.volumeInfo.authors.map((author, x) => {
                return (
                  <li key={x}>
                    <span>{author}</span>
                  </li>
                );
              })}
            </ul>
          )}
          <BiBookAdd
            onClick={() => {
              onClickAddBook(searchedBook.id);
            }}
          />
        </div>
      );
    });
  }

  function onClickAddBook(searchedBookId) {
    console.log(searchedBookId);
  }
  return (
    <Section>
      {booksArray && booksArray.length >= 1 && <p>Results</p>}
      {mappedSearchedBooks}
    </Section>
  );
}
export default RenderSearch;

const Section = styled.section`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 5px 5px 100px 5px;
  overflow: auto;
  height: 80vh;
  div {
    border-top: 1px solid black;
    display: flex;
    padding: 5px;
    align-items: flex-start;
    justify-content: space-between;
    width: 100%;

    img {
      width: 12%;
      height: 60px;
      margin: 3px;
    }
    p {
      margin: 3px;
      width: 40%;
    }
    ul {
      width: 30%;
      padding: 0;
      list-style: circle;
      margin: 7px 0 0 20px;
      li {
        span {
          position: relative;
          left: -6px;
        }
      }
    }
    svg {
      width: 10%;
      font-size: 20px;
      margin-top: 5px;
    }
  }
`;
