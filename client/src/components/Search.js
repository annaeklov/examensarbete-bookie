import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import axios from "axios";
import RenderSearch from "./RenderSearch";

function Search({ getUserAxios, userInfo }) {
  let history = useHistory();
  const [submitting, setSubmitting] = useState(false);
  const [searchInputTitle, setSearchInputTitle] = useState("");
  //const [searchInputAuthor, setSearchInputAuthor] = useState("");
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
    if (searchInputTitle.trim().length === 0) {
      console.log("i trim");
      setSearchInputTitle("");
      //setSearchInputAuthor("");
      return;
    }
    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      getBookFromAPI();
      setSearchInputTitle("");
      //setSearchInputAuthor("");
    }, 2000);
  }

  function handleChangeTitle(e) {
    setSearchInputTitle(e.target.value);
    setBooksArray([]);
  }

  function getBookFromAPI() {
    axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?q=${searchInputTitle}&maxResults=10`
      )
      .then((response) => {
        setBooksArray(response.data.items);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      <H1>SEARCH BOOK</H1>
      <Form onSubmit={handleSubmit}>
        <label>
          <p>Title, author or both</p>
          <input
            name="title"
            onChange={handleChangeTitle}
            value={searchInputTitle}
            required
            autoFocus
            type="text"
          />
        </label>
        <span>
          You must write complete words, <br />
          eg "Becoming", not "Becomi".
        </span>

        <button type="submit">SEARCH</button>
      </Form>
      {submitting && (
        <SearchingFor>
          <span className="first">Searching for:</span>
          <span>{searchInputTitle && searchInputTitle}</span>
        </SearchingFor>
      )}
      <RenderSearch booksArray={booksArray} userInfo={userInfo} />
    </>
  );
}

export default Search;

const H1 = styled.h1`
  font-weight: 900;
  text-align: center;
  margin: 35px 0 5px 0;
`;

const Form = styled.form`
  display: flex;
  width: 70%;
  border: 1px solid grey;
  flex-direction: column;
  padding: 5px;
  border-radius: 3px;
  align-items: center;
  label {
    width: 250px;
    p {
      margin: 2px 0;
      font-size: 14px;
      font-variant-caps: all-small-caps;
    }
    input[type="text"] {
      padding: 5px;
      margin-bottom: 5px;
      border: none;
      border-bottom: 1px solid grey;
      width: 100%;
      height: 20px;
      ::placeholder {
        font-size: 12px;
      }
      :focus {
        outline: none;
      }
    }
  }
  span {
    font-size: 11px;
    font-style: italic;
    color: grey;
  }
  button {
    margin: 12px 0;
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

const SearchingFor = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  .first {
    font-size: 16px;
  }
  span {
    font-size: 20px;
    font-variant-caps: all-small-caps;
  }
`;

/*------*/
// OM Author ska med är info nedan

/* ||
      searchInputAuthor.trim().length === 0 */

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

/*      function handleChangeAuthor(e) {
    setSearchInputAuthor(e.target.value);
  } */
