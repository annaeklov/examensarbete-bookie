import React, { useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import styled from "styled-components";

function Bookclubs({ getUserAxios, userInfo }) {
  let history = useHistory();

  useEffect(() => {
    const loggedInUserId = localStorage.getItem("userId");
    if (!loggedInUserId) {
      history.push("/login");
    } else {
      getUserAxios(loggedInUserId);
      if (userInfo.bookclubs.length === 1) {
        let id = userInfo.bookclubs[0].bookclub_id;
        history.push("/bookclubs/" + id);
      }
    }
    return () => {};
  }, []);

  let mappedBookclubs;
  console.log(userInfo.bookclubs);

  if (userInfo.bookclubs) {
    console.log(userInfo.bookclubs);
    mappedBookclubs = userInfo.bookclubs.map((club) => {
      return (
        <p className="bookclubName" key={club.bookclub_id}>
          <Link className="links" to={"/bookclubs/" + club.bookclub_id}>
            {club.name}
          </Link>
        </p>
      );
    });
  }
  return (
    <>
      <BookclubsInfoDiv>
        <h1>My bookclubs</h1>
        <div>{mappedBookclubs}</div>
      </BookclubsInfoDiv>
      <CitatDiv>
        <blockquote>
          A room without books is like a body without a soul - Cicero
        </blockquote>
      </CitatDiv>
    </>
  );
}

export default Bookclubs;

const BookclubsInfoDiv = styled.div`
  width: 98%;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 200px;
  h1 {
    font-weight: 900;
  }

  .bookclubName {
    margin: 2px;
    text-decoration: underline;
  }
  .links {
    text-decoration: none;
    color: black;
  }
`;

const CitatDiv = styled.div`
  margin-top: 65px;
  text-align: center;
  blockquote {
    font-style: italic;
    font-weight: lighter;
    font-size: 40px;
    opacity: 0.4;
  }
`;
