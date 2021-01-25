import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory, Redirect } from "react-router-dom";

function Login() {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
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
      });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (username.trim() === "" || password.trim() === "") {
      return console.log("tomma inputs");
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
    </div>
  );
}

export default Login;
