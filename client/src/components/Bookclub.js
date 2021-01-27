import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useHistory, Redirect, NavLink, useParams } from "react-router-dom";
import RenderBooks from "./RenderBooks";

function Bookclub({ userInfo }) {
  const [bookClubInfo, setBookClubInfo] = useState({});
  const { id } = useParams();

  useEffect(() => {
    getUserBookclub();
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

      <RenderBooks bookClubInfo={bookClubInfo}/>
    </>
  );
}

export default Bookclub;

