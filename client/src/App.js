import React, { useState, useEffect } from "react";
import "./App.css";
import {
  Route,
  Switch,
  BrowserRouter as Router,
} from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Search from "./components/Search";
import TabBar from "./components/TabBar";
import Bookclubs from "./components/Bookclubs";
import Bookclub from "./components/Bookclub";

function App() {
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const loggedInUserId = localStorage.getItem("userId");
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
    <Router>
      <AppDiv>
        <Switch />
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/user">
          <Profile
            getUserAxios={getUserAxios}
            userInfo={userInfo}
            setUserInfo={setUserInfo}
          />
          <TabBar />
        </Route>
        <Route path="/search">
          <Search
            getUserAxios={getUserAxios}
            userInfo={userInfo}
            setUserInfo={setUserInfo}
          />
          <TabBar />
        </Route>
        <Route exact path="/bookclubs">
          <Bookclubs
            getUserAxios={getUserAxios}
            userInfo={userInfo}
            setUserInfo={setUserInfo}
          />
          <TabBar />
        </Route>
        <Route path="/bookclubs/:id">
          <Bookclub
            userInfo={userInfo}
          />
          <TabBar />
        </Route>
        <Switch />
      </AppDiv>
    </Router>
  );
}

export default App;

const AppDiv = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;
  min-height: 100vh;
  background-color: #E3E4DB;
  position: absolute;
  
`;

