import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const Lists = () => {
  const { store, actions } = useContext(Context);
  const params = useParams();

  const [date, setDate] = useState("");

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

  return (
    <div className="lists-container">
      <div className="lists-header">
        <span className="lists-date">{date}</span>
      </div>
      <div className="lists-tabs"></div>
      <ul className="lists-list">
        {store.todos.map((todo, index) => {
          return (
            <li className="row" key={index}>
              {todo.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
