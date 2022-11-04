import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";
import { Link, useParams, useMatch, useNavigate } from "react-router-dom";

export const Tabs = () => {
  const { store, actions } = useContext(Context);
  const params = useParams();

  const isTodosRoute = useMatch("/todos");
  const isHabitsRoute = useMatch("/habits");

  const [activeTab, setActiveTab] = useState(isTodosRoute ? "todos" : "habits");

  return (
    <div className="Tabs">
      <Link to="/todos">
        <span
          className={`Tabs-tab ${activeTab === "todos" ? "active" : ""}`}
          onClick={() => {
            setActiveTab("todos");
          }}
        >
          todos
        </span>
      </Link>
      <Link to="/habits">
        <span
          className={`Tabs-tab ${activeTab === "habits" ? "active" : ""}`}
          onClick={() => {
            setActiveTab("habits");
          }}
        >
          habits
        </span>
      </Link>
    </div>
  );
};
