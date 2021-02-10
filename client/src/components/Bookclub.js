import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import RenderBooks from "./RenderBooks";
import pic1 from "../pics/actress.png";
import pic2 from "../pics/gardener.png";
import pic3 from "../pics/girl.png";
import pic4 from "../pics/staff.png";

function Bookclub({ userInfo }) {
  const [bookClubInfo, setBookClubInfo] = useState({});
  const [showModal, setShowModal] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    getUserBookclub();
    return () => {};
  }, [showModal]);

  function getUserBookclub() {
    axios
      .get(`http://localhost:3000/bookclub/${id}`)
      .then((response) => {
        setBookClubInfo(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  const avatars = [pic1, pic2, pic3, pic4];

  function randomAvatar() {
    const randomIndex = Math.floor(Math.random() * avatars.length);
    return randomIndex;
  }

  let mappedMembers;

  if (bookClubInfo.users) {
    mappedMembers = bookClubInfo.users.map((member) => {
      return (
        <div key={member.user_id}>
          <img src={avatars[randomAvatar()]} alt={member.name} />
          <p>{member.name}</p>
        </div>
      );
    });
  }

  return (
    <>
      <BookClubInfoDiv>
        <h1>{bookClubInfo.name && bookClubInfo.name.toUpperCase()}</h1>
        <p className="meeting">
          Next meeting: {bookClubInfo.nextMeeting && bookClubInfo.nextMeeting}
        </p>
        <div className="membersDiv">{bookClubInfo.users && mappedMembers}</div>
      </BookClubInfoDiv>
      <RenderBooks
        bookClubInfo={bookClubInfo}
        showModal={showModal}
        setShowModal={setShowModal}
        userInfo={userInfo}
      />
    </>
  );
}

export default Bookclub;

const BookClubInfoDiv = styled.div`
  width: 98%;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 23%;
  h1 {
    font-weight: 900;
    text-align: center;
    margin: 25px 0 15px 0;
  }
  .meeting {
    margin: 0;
    position: absolute;
    top: 3px;
    right: 2px;
    font-size: 13px;
    font-weight: 300;
  }
  .membersDiv {
    display: flex;
    width: 98%;
    justify-content: space-evenly;
    div {
      text-align: center;
    }
    p {
      margin: 0;
      font-size: 13px;
      font-weight: 300;
    }
  }
`;
