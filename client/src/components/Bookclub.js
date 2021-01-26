import React, { useState, useEffect } from "react";
import axios from "axios";

import { useHistory, Redirect, NavLink, useParams } from "react-router-dom";

function Bookclub({ userInfo }) {
  const [bookClubInfo, setBookClubInfo] = useState({});

  const { id } = useParams();
  console.log(id);

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

  useEffect(() => {
    if (userInfo.bookclubs) {
      getUserBookclub();
    }
    return () => {};
  }, []);

  return (
    <>
      <p>Bookclub: {bookClubInfo.name && bookClubInfo.name}</p>
    </>
  );
}

export default Bookclub;
