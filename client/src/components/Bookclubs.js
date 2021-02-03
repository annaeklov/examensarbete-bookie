import React, {  useEffect } from "react";
import { useHistory, Link } from "react-router-dom";

function Bookclubs({ getUserAxios, userInfo }) {
  let history = useHistory();

  useEffect(() => {
    const loggedInUserId = localStorage.getItem("userId");
    if (!loggedInUserId) {
      history.push("/login");
    } else {
      getUserAxios(loggedInUserId);
      if (userInfo.bookclubs.length === 1) {
        let id = userInfo.bookclubs[0].bookclub_id;
        history.push("/bookclubs/" + id);
      }
    }
    return () => {};
  }, []);

  let mappedBookclubs;

  if (userInfo.bookclubs) {
    console.log(userInfo.bookclubs);
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
      <div>
        <ul>
          <strong>Bookclubs</strong>
          {mappedBookclubs}
        </ul>
        <p>"(Hi, citat här)"</p>
      </div>
    </>
  );
}

export default Bookclubs;
