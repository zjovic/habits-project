import React, { useState, useEffect, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Login = () => {
  const { store, actions } = useContext(Context);
  const params = useParams();
  const navigate = useNavigate();

  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowErrorMessage(false);

    if (!password || !email) {
      setShowErrorMessage(true);
      return;
    }

    try {
      const options = {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      };
      const response = await fetch("http://127.0.0.1:3001/api/login", options);

      if (response.status === 200) {
        const data = await response.json();
        sessionStorage.setItem("token", data.access_token);
        return navigate("/lists");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="login-container">
      <form className="habitsForm">
        <h1 className="habitsForm-title">Login</h1>
        <fieldset className="habitsForm-fieldset">
          <label className="habitsForm-label" htmlFor="email">
            Email address
          </label>
          <input
            id="email"
            className="habitsForm-input"
            type="text"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </fieldset>
        <fieldset className="habitsForm-fieldset">
          <label className="habitsForm-label" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            className="habitsForm-input"
            type="password"
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </fieldset>
        {showErrorMessage ? (
          <div className="habitsForm-error">Please check the data entered!</div>
        ) : (
          ""
        )}
        <button type="submit" className="login-action" onClick={handleSubmit}>
          Submit
        </button>
      </form>
      <div>
        <p className="login-registerLink">
          Don’t have an account yet? <Link to="/register">Register now.</Link>
        </p>
      </div>
    </div>
  );
};
