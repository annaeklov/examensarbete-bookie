import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import RenderSearch from "./RenderSearch";

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
        `https://www.googleapis.com/books/v1/volumes?q=${searchInputTitle}&maxResults=10`
      )
      .then((response) => {
        console.log("book", response.data.items);
        setBooksArray(response.data.items);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //console.log("title", searchInputTitle);
  //console.log("author", searchInputAuthor);
  //console.log("booksArray", booksArray);

  return (
    <>
      <h1 style={{ marginBottom: "2px" }}>SEARCH</h1>

      <form onSubmit={handleSubmit}>
        <fieldset>
          <label>
            <p>Title, author or both</p>
            <input
              name="title"
              placeholder="Search"
              onChange={handleChangeTitle}
              value={searchInputTitle}
              required
              autoFocus
            />
          </label>
          <br />
          <span
            style={{ fontSize: "11px", fontStyle: "italic", color: "grey" }}
          >
            You must write complete words, <br />
            eg "Harry Potter", not "Harry Pot"
          </span>
        </fieldset>

        <button type="submit">SEARCH</button>
      </form>
      {submitting && (
        <p>
          Searching for: <br />
          <span style={{ fontStyle: "italic" }}>
            {searchInputTitle ? searchInputTitle : searchInputAuthor}
          </span>
        </p>
      )}
      <RenderSearch booksArray={booksArray} userInfo={userInfo}/>
    </>
  );
}

export default Search;




/*------*/
// OM Author ska med är info nedan

  /*  <p
        style={{
          fontSize: "13px",
          fontWeight: "bold",
          textAlign: "center",
          marginTop: "2px",
        }}
      >
        Search for <u>both</u> title and author <br />
        <u>or</u> just one of them
      </p> */

  /*  <fieldset>
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
        </fieldset> */

