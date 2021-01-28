import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, Redirect, Link } from "react-router-dom";
import TabBar from "./TabBar";
import RenderBooks from "./RenderBooks";

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
      <p>Profile {userInfo.username}</p>
      <button
        onClick={() => {
          localStorage.removeItem("userId");
          history.push("/login");
        }}
      >
        Logout
      </button>
      <div>
        <ul>
          <strong>Your bookclubs</strong>
          {mappedBookclubs}
        </ul>
      </div>

      <RenderBooks userInfo={userInfo} />
    </>
  );
}

export default Profile;
