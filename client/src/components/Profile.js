import React, { useState, useEffect } from "react";
import axios from "axios";

import { useHistory, Redirect } from "react-router-dom";

function Profile() {
  const [userInfo, setUserInfo] = useState({});

  let history = useHistory();

  useEffect(() => {
    const loggedInUserId = localStorage.getItem("userId");
    if (!loggedInUserId) {
      console.log(loggedInUserId);
      history.push("/login");
    } else {
      getUserAxios(loggedInUserId);
    }

    return () => {};
  }, []);

  function getUserAxios(loggedInUserId) {
    axios
      .get(`http://localhost:3000/user/${loggedInUserId}`)
      .then((response) => {
        console.log(response.data);
        setUserInfo(response.data);
      })
      .catch((error) => {
        console.log(error);
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
    </>
  );
}

export default Profile;
