import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { useMatch } from "react-router-dom";
import { TrashIcon } from "./icons";

export const TodosList = () => {
  const { store, actions } = useContext(Context);

  const ITEM_DONE = 0;
  const ITEM_NOT_DONE = 1;

  const [isDeleteActionVisible, setIsDeleteActionVisible] = useState(false);

  const isSettingsRoute = useMatch("/settings");

  useEffect(() => {
    if (store.todos.length === 0) {
      const getTodos = async () => {
        try {
          actions.setLoading(true);
          await actions.fetchTodos();
          actions.setLoading(false);
        } catch (error) {
          console.log(error);
        }
      };

      getTodos();
    }
  }, []);

  const handleItemClick = (id) => {
    isSettingsRoute ? actions.deleteTodo(id) : actions.toggleTodo(id);
  };

  console.log("store", store);

  if (!store?.todos || store?.todos?.length === 0) {
    return <p>Loading</p>;
  }

  // create empty state feedback component
  return (
    <div>
      <ul className="TodosList">
        {store.todos.map((todo) => {
          return (
            <li
              className={`TodosList-item ${
                todo.state === ITEM_DONE ? "finished" : ""
              } ${isSettingsRoute ? "settings" : ""}`}
              key={todo.id}
              onClick={() => handleItemClick(todo.id)}
              onMouseEnter={() => setIsDeleteActionVisible(true)}
              onMouseLeave={() => setIsDeleteActionVisible(false)}
            >
              {todo.name}
              {isSettingsRoute && isDeleteActionVisible ? <TrashIcon /> : ""}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
