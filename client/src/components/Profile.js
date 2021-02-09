import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useHistory, Link } from "react-router-dom";
import RenderBooks from "./RenderBooks";
import { IoLogOutOutline } from "react-icons/io5";

function Profile({ getUserAxios, userInfo }) {
  const [showModal, setShowModal] = useState(false);

  let history = useHistory();

  useEffect(() => {
    const loggedInUserId = localStorage.getItem("userId");
    if (!loggedInUserId) {
      history.push("/login");
    } else {
      getUserAxios(loggedInUserId);
    }
    return () => {};
  }, []);

  let mappedBookclubs;

  if (userInfo.bookclubs) {
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
      <ProfileInfoDiv>
        <h1>{userInfo.username}</h1>
        <button
          onClick={() => {
            localStorage.removeItem("userId");
            history.push("/login");
          }}
        >
          <IoLogOutOutline />
        </button>
        <div>
          <ul>
            <strong>My bookclubs</strong>
            {mappedBookclubs}
          </ul>
        </div>
      </ProfileInfoDiv>
      <RenderBooks
        userInfo={userInfo}
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </>
  );
}

export default Profile;

const ProfileInfoDiv = styled.div`
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
  .meeting {
    margin: 0;
    position: absolute;
    top: 55px;
    right: 10px;
    font-size: 13px;
    font-weight: 300;
  }
  button {
    position: absolute;
    top: 10px;
    right: 10px;
    border: none;
    background-color: transparent;
    svg {
      font-size: 20px;
    }
  }
`;
