import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";
import { Link, useParams } from "react-router-dom";

export const Tabs = ({ handleTabToggle }) => {
  const { store, actions } = useContext(Context);
  const params = useParams();

  const [activeTab, setActiveTab] = useState("todos");

  return (
    <div className="list-tabs">
      <span
        className={`list-tab ${activeTab === "todos" ? "active" : ""}`}
        onClick={(event) => {
          handleTabToggle("todos");
          setActiveTab("todos");
        }}
      >
        todos
      </span>
      <span
        className={`list-tab ${activeTab === "habits" ? "active" : ""}`}
        onClick={(event) => {
          handleTabToggle("habits");
          setActiveTab("habits");
        }}
      >
        habits
      </span>
    </div>
  );
};

Tabs.propTypes = {
  handleTabToggle: PropTypes.func,
};
