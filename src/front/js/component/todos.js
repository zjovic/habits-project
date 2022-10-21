import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";
import { Link, useParams } from "react-router-dom";

export const Todos = ({ items }) => {
  const { store, actions } = useContext(Context);
  const params = useParams();

  const ITEM_DONE = 0;
  const ITEM_NOT_DONE = 1;

  const handleItemClick = (id) => {
    actions.toggleTodo(id);
  };

  return (
    <div>
      <ul className="todos-list">
        {items.map((item) => {
          return (
            <li
              className={`todos-list-item ${
                item.state === ITEM_DONE ? "finished" : ""
              }`}
              key={item.id}
              onClick={() => handleItemClick(item.id)}
            >
              {item.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

Todos.propTypes = {
  items: PropTypes.array,
};
