import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Link, useParams, useMatch, useNavigate } from "react-router-dom";

export const Footer = () => {
  const { store, actions } = useContext(Context);
  const params = useParams();
  const navigate = useNavigate();

  const isListsRoute = useMatch("/lists");
  const isSettingsRoute = useMatch("/settings");

  const handleLogout = async () => {
    await actions.logout();
    navigate("/");
  };

  return (
    <footer className="footer">
      <span className="footer-link">Settings</span>
      <span className="footer-link" onClick={handleLogout}>
        Logout
      </span>
    </footer>
  );
};
