import React, { useState, useEffect } from "react";
import "./App.css";
import { Redirect, Route, BrowserRouter as Router } from "react-router-dom";
import axios from "axios";
import Login from "./components/Login";
import Profile from "./components/Profile";

function App() {
  useEffect(() => {
    const loggedInUserId = localStorage.getItem("userId");
    return () => {};
  }, []);

  return (
    <div className="app">
      <Router>
        <Route exact path="/" component={() => <Profile />} />
        <Route path="/login" component={() => <Login />} />
      </Router>
    </div>
  );
}

export default App;
