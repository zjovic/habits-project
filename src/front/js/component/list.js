import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";
import { Link, useParams } from "react-router-dom";

export const List = ({ activeTab }) => {
  const { store, actions } = useContext(Context);
  const params = useParams();

  const [items, setItems] = useState(store.todos);

  const ITEM_DONE = 0;
  const ITEM_NOT_DONE = 1;

  useEffect(() => {
    let list;
    activeTab === "todos" ? (list = store.todos) : (list = store.habits);
    setItems(list);
  }, [activeTab, store.todos, store.habits]);

  const handleItemClick = (id) => {
    actions.toggleTodo(id);
  };

  // no event for habit click
  return (
    <div>
      <ul className="lists-list">
        {items.map((item) => {
          return (
            <li
              className={`lists-item ${
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

List.propTypes = {
  activeTab: PropTypes.string,
};
