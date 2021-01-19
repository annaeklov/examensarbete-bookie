import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";

import Login from "./components/Login";

function App() {
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    // kolla om det finns _id i localStorage
    // OM JA, redirecta till /profil och kolla _id i localStorage och ta den infon
    return () => {};
  }, []);

  return (
    <div className="wrapper" style={{ padding: "20px" }}>
      <Login userInfo={userInfo} setUserInfo={setUserInfo} />
    </div>
  );
}

export default App;
