import React, { useState, useEffect } from "react";
import { useHistory, Redirect, NavLink } from "react-router-dom";

function Search({ getUserAxios, userInfo }) {
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
  return (
    <>
      <p>SÖK</p>
    </>
  );
}

export default Search;
