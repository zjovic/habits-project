import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Link, useParams, useMatch } from "react-router-dom";

export const Footer = () => {
  const { store, actions } = useContext(Context);
  const params = useParams();

  const isListsRoute = useMatch("/lists");
  const isSettingsRoute = useMatch("/settings");

  const handleLogout = () => {
    actions.logout();
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
