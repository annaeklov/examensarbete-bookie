import React, { useEffect, useState } from "react";
import styled from "styled-components";
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
    <>
      <Form onSubmit={handleSubmit}>
        <label>
          {" "}
          <p>Username</p>
          <input
            type="text"
            name="username"
            placeholder="Username"
            required
            onChange={onChangeUsername}
            autoFocus
            value={username}
          />
        </label>
        <label>
          {" "}
          <p>Password</p>
          <input
            type="password"
            required
            name="password"
            placeholder="Password"
            minLength="1"
            onChange={onChangePassword}
            value={password}
          />
        </label>
        <input type="submit" value="Logga in" />
      </Form>
      {errorMsg === "Empty" && <p>Input kan inte vara tomt</p>}
      {errorMsg === "Wrong" && <p>Användarnamn eller lösen är fel</p>}
    </>
  );
}

export default Login;

const Form = styled.form`
  display: flex;
  width: 70%;
  flex-direction: column;
  padding: 5px;
  border-radius: 3px;
  align-items: center;
  label {
    width: 250px;
    p {
      margin: 2px 0;
      font-size: 14px;
      font-variant-caps: all-small-caps;
    }
    input[type="text"] {
      padding: 5px;
      margin-bottom: 5px;
      border: none;
      border-bottom: 1px solid grey;
      width: 100%;
      height: 20px;
      ::placeholder {
        font-size: 12px;
      }
      :focus {
        outline: none;
      }
    }
    input[type="password"] {
      padding: 5px;
      margin-bottom: 5px;
      border: none;
      border-bottom: 1px solid grey;
      width: 100%;
      height: 20px;
      ::placeholder {
        font-size: 12px;
      }
      :focus {
        outline: none;
      }
    }
  }
  span {
    font-size: 11px;
    font-style: italic;
    color: grey;
  }
  input[type="submit"] {
    margin: 12px 0;
    border: 1px solid #262824;
    border-radius: 5px;
    width: 85px;
    height: 25px;
    background-color: transparent;
    box-shadow: 2px 0px 4px lightgrey;

    :active,
    :focus {
      outline: none;
    }
  }
`;
