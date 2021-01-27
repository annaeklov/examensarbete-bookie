import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useHistory, Redirect, NavLink, useParams } from "react-router-dom";

function Bookclub({ userInfo }) {
  const [bookClubInfo, setBookClubInfo] = useState({});
  const { id } = useParams();

  useEffect(() => {
    if (userInfo.bookclubs) {
      getUserBookclub();
    }
    return () => {};
  }, []);

  function getUserBookclub() {
    axios
      .get(`http://localhost:3000/bookclub/${id}`)
      .then((response) => {
        console.log(response.data);
        setBookClubInfo(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  let mappedMembers;

  if (bookClubInfo.users) {
    mappedMembers = bookClubInfo.users.map((member) => {
      return <li key={member.user_id}>{member.name}</li>;
    });
  }

  return (
    <>
      <h1>{bookClubInfo.name && bookClubInfo.name}</h1>
      <p>
        Next meeting: {bookClubInfo.nextMeeting && bookClubInfo.nextMeeting}
      </p>
      <p>Medlemmar: {bookClubInfo.users && mappedMembers}</p>

      <Tabs>
        <button type="button" className="readBtn" active>
          READ
        </button>
        <button type="button" className="toReadBtn">
          TO READ
        </button>
        <button type="button" className="currentlyBtn">
          CURRENTLY
        </button>
      </Tabs>
      <section></section>
    </>
  );
}

export default Bookclub;

const Tabs = styled.div`
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
