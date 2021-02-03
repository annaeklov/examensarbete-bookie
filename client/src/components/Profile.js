import React, { useEffect } from "react";
import styled from "styled-components";
import { useHistory, Link } from "react-router-dom";
import RenderBooks from "./RenderBooks";
import { IoLogOutOutline } from "react-icons/io5";


function Profile({ getUserAxios, userInfo }) {
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
        <li key={club.bookclub_id}>
          <Link to={"/bookclubs/" + club.bookclub_id}>{club.name}</Link>
        </li>
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
            <strong>Your bookclubs</strong>
            {mappedBookclubs}
          </ul>
        </div>
      </ProfileInfoDiv>
      <RenderBooks userInfo={userInfo} />
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
