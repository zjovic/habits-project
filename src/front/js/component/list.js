import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";
import { Link, useParams } from "react-router-dom";
import { Todos } from "./todos";
import { Habits } from "./habits";

export const List = ({ activeTab }) => {
  const { store, actions } = useContext(Context);
  const params = useParams();

  const [items, setItems] = useState(store.todos);

  useEffect(() => {
    let list;
    activeTab === "todos" ? (list = store.todos) : (list = store.habits);
    setItems(list);
  }, [activeTab]);

  return (
    <div>
      {activeTab === "todos" ? (
        <Todos items={items} />
      ) : (
        <Habits items={items} />
      )}
    </div>
  );
};

List.propTypes = {
  activeTab: PropTypes.string,
};
