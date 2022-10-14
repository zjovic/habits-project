import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { Message } from "../component/message.js";

export const Lists = () => {
  const { store, actions } = useContext(Context);
  const params = useParams();

  const [date, setDate] = useState("");
  const [activeTab, setActiveTab] = useState("todos");

  useEffect(() => {
    const getCurrentDate = async () => {
      const event = new Date();
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      setDate(event.toLocaleDateString(undefined, options));
    };
    getCurrentDate();
  }, []);

  const handleTodosTab = () => {
    setActiveTab("todos");
  };

  const handleHabitsTab = () => {
    setActiveTab("habits");
  };

  // if no todos and no habits, fetch

  return (
    <div className="lists-container">
      <div className="lists-header">
        <span className="lists-date">{date}</span>
        <Message />
      </div>
      <div className="list-tabs">
        <span
          className={`list-tab ${activeTab === "todos" ? "active" : ""}`}
          onClick={handleTodosTab}
        >
          todos
        </span>
        <span
          className={`list-tab ${activeTab === "habits" ? "active" : ""}`}
          onClick={handleHabitsTab}
        >
          habits
        </span>
      </div>
      <ul className={`lists-list ${activeTab === "todos" ? "active" : ""}`}>
        {store.todos.map((todo, index) => {
          return (
            <li className="row" key={index}>
              {todo.name}
            </li>
          );
        })}
      </ul>
      <ul className={`lists-list ${activeTab === "habits" ? "active" : ""}`}>
        {store.habits.map((habit, index) => {
          return (
            <li className="row" key={index}>
              {habit.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
