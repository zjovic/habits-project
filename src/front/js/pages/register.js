import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const Register = () => {
  const { store, actions } = useContext(Context);
  const params = useParams();

  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [changePassword, setChangePassword] = useState("");
  const [showSuccessScreen, setshowSuccessScreen] = useState(false);

  const passwordMatch = (e) => {
    return password === changePassword;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowErrorMessage(false);

    if (!passwordMatch || !password || !email || !name) {
      setShowErrorMessage(true);
      return;
    }

    try {
      await actions.registerUser({
        password: password,
        email: email,
        name: name,
      });
    } catch (error) {
      console.log("registration error", error);
    }
  };

  return (
    <div className="register-container">
      {showSuccessScreen ? (
        <p>
          Your registration was successful, please proceed to{" "}
          <Link to="/login">login</Link>
        </p>
      ) : (
        <div>
          <form className="habitsForm">
            <h1 className="habitsForm-title">Register</h1>
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
              <label className="habitsForm-label" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                className="habitsForm-input"
                type="text"
                name="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
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
            <fieldset className="habitsForm-fieldset">
              <label className="habitsForm-label" htmlFor="changePassword">
                Password
              </label>
              <input
                id="changePassword"
                className="habitsForm-input"
                type="password"
                name="changePassword"
                value={changePassword}
                onChange={(e) => {
                  setChangePassword(e.target.value);
                }}
              />
            </fieldset>
            {showErrorMessage ? (
              <div className="habitsForm-error">
                Please check the data entered!
              </div>
            ) : (
              ""
            )}
            <button
              type="submit"
              className="register-action"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </form>
          <div>
            <p className="register-registerLink">
              Don’t have an account yet? <Link to="/login">Login now.</Link>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
