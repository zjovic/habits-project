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

    await actions.getJWToken({
      email: email,
      password: password,
    });

    return navigate("/todos");
  };

  return (
    <div className="Login">
      <form className="HabitsForm">
        <h1 className="HabitsForm-title">Login</h1>
        <fieldset className="HabitsForm-fieldset">
          <label className="HabitsForm-label" htmlFor="email">
            Email address
          </label>
          <input
            id="email"
            className="HabitsForm-input"
            type="text"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </fieldset>
        <fieldset className="HabitsForm-fieldset">
          <label className="HabitsForm-label" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            className="HabitsForm-input"
            type="password"
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </fieldset>
        {showErrorMessage ? (
          <div className="HabitsForm-error">Please check the data entered!</div>
        ) : (
          ""
        )}
        <button
          type="submit"
          className="Button Button--confirm"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
      <div>
        <p className="Login-registerLink">
          Don’t have an account yet? <Link to="/register">Register now.</Link>
        </p>
      </div>
    </div>
  );
};
