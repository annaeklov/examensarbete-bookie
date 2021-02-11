import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

function Login() {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  let history = useHistory();

  useEffect(() => {
    const loggedInUserId = localStorage.getItem("userId");
    if (loggedInUserId) {
      history.push("/");
    }
    return () => {};
  }, []);

  function postAxios() {
    const user = { username, password };
    axios
      .post("http://localhost:3000/login", user)
      .then((response) => {
        localStorage.setItem("userId", response.data.userId);
        history.push("/");
      })
      .catch((error) => {
        console.log(error);
        setErrorMsg("Wrong");
        setUsername("");
        setPassword("");
      });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (username.trim() === "" || password.trim() === "") {
      return setErrorMsg("Empty");
    }
    postAxios();
  }

  function onChangeUsername(e) {
    setUsername(e.target.value);
  }
  function onChangePassword(e) {
    setPassword(e.target.value);
  }

  return (
    <div className="Login">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          required
          onChange={onChangeUsername}
          autoFocus
          value={username}
        />
        <input
          type="password"
          required
          name="password"
          placeholder="Password"
          minLength="1"
          onChange={onChangePassword}
          value={password}
        />
        <input type="submit" value="Logga in" />
      </form>
      {errorMsg === "Empty" && <p>Input kan inte vara tomt</p>}
      {errorMsg === "Wrong" && <p>Användarnamn eller lösen är fel</p>}
    </div>
  );
}

export default Login;
