import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, Redirect, Link } from "react-router-dom";
import TabBar from "./TabBar";

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
      <div>
        <ul>
          <strong>Bookclubs</strong>
          {mappedBookclubs}
        </ul>
      </div>

      <button
        onClick={() => {
          localStorage.removeItem("userId");
          history.push("/login");
        }}
      >
        Logout
      </button>
    </>
  );
}

export default Profile;


