import React, { useState } from "react";
import axios from "axios";

function Login({ setUserInfo }) {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  function postAxios() {
    axios
      .post("http://localhost:3000/login", {
        username,
        password,
      })
      .then((response) => {
        console.log(response.data.data);
        // när jag fått något här ska jag spara _id i localStorage
        // OCH redirecta till /something
        setUserInfo(response.data.data);
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
