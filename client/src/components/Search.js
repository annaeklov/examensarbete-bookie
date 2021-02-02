import React, { useState, useEffect } from "react";
import { useHistory, Redirect, NavLink } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

function Search({ getUserAxios, userInfo }) {
  let history = useHistory();
  const [submitting, setSubmitting] = useState(false);
  const [searchInputTitle, setSearchInputTitle] = useState("");
  const [searchInputAuthor, setSearchInputAuthor] = useState("");
  const [booksArray, setBooksArray] = useState({});

  useEffect(() => {
    const loggedInUserId = localStorage.getItem("userId");
    if (!loggedInUserId) {
      history.push("/login");
    } else {
      getUserAxios(loggedInUserId);
    }
    return () => {};
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    if (searchInputTitle.trim() === "" || searchInputAuthor.trim() === "") {
      console.log("i trim");
    }
    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      getBookFromAPI();
      setSearchInputTitle("");
      setSearchInputAuthor("");
    }, 3000);
  }

  function handleChangeTitle(e) {
    setSearchInputTitle(e.target.value);
  }

  function handleChangeAuthor(e) {
    setSearchInputAuthor(e.target.value);
  }

  function getBookFromAPI() {
    axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?q=intitle:"${searchInputTitle}"+inauthor:"${searchInputAuthor}"&maxResults=8`
      )
      .then((response) => {
        console.log("book", response.data.items);
        setBooksArray(response.data.items);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  console.log("title", searchInputTitle);
  console.log("author", searchInputAuthor);
  console.log("booksArray", booksArray);

  let mappedSearchedBooks;

  if (booksArray && booksArray.length >= 1) {
    console.log("ja");
    mappedSearchedBooks = booksArray.map((searchedBook, x) => {
      return (
        <div key={searchedBook.id}>
          <p>{searchedBook.volumeInfo.title} </p>
          {searchedBook.volumeInfo.authors && (
            <p>
              {searchedBook.volumeInfo.authors.map((author) => {
                return <p>{author}</p>;
              })}
            </p>
          )}
          {searchedBook.volumeInfo.imageLinks && (
            <img
              src={searchedBook.volumeInfo.imageLinks.smallThumbnail}
              alt={searchedBook.volumeInfo.title}
            />
          )}
        </div>
      );
    });
  }

  return (
    <>
      <h1>SEARCH</h1>
      <p style={{ fontSize: "13px", fontWeight: "bold", textAlign: "center" }}>
        Search for <u>both</u> title and author <br />
        <u>or</u> just one of them
      </p>
      {submitting && (
        <p>
          Searching for:
          <span style={{ fontStyle: "italic" }}>
            {searchInputTitle ? searchInputTitle : searchInputAuthor}
          </span>
          ...
        </p>
      )}
      <form onSubmit={handleSubmit}>
        <fieldset>
          <label>
            <p>Title</p>
            <input
              name="title"
              placeholder="Search for a title"
              onChange={handleChangeTitle}
              value={searchInputTitle}
            />
          </label>
          <br />
          <span
            style={{ fontSize: "11px", fontStyle: "italic", color: "grey" }}
          >
            You must write complete words, ex "Jag for", inte "Jag f"
          </span>
        </fieldset>
        <fieldset>
          <label>
            <p>Author</p>
            <input
              name="author"
              placeholder="Search for an author"
              onChange={handleChangeAuthor}
              value={searchInputAuthor}
            />
          </label>
          <br />

          <span
            style={{ fontSize: "11px", fontStyle: "italic", color: "grey" }}
          >
            You must write a complete name, ex "Karin", inte "Kar"
          </span>
        </fieldset>
        <button type="submit">SEARCH</button>
      </form>
      <Section>{mappedSearchedBooks}</Section>

    </>
  );
}

export default Search;

const Section = styled.section`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: unset;
  padding: 5px 5px 100px 5px;
  overflow: auto;
  height: 80vh;
`;
