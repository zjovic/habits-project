import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Tabs } from "../component/tabs.js";
import { Header } from "../component/header.js";
import { AddTodo } from "../component/add-to-do.js";

export const Todos = () => {
  const { store, actions } = useContext(Context);

  const ITEM_DONE = 0;
  const ITEM_NOT_DONE = 1;

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
    actions.toggleTodo(id);
  };

  return (
    <div>
      <Header />
      <Tabs />
      <ul className="todos-list">
        {store.todos.map((todo) => {
          return (
            <li
              className={`todos-list-item ${
                todo.state === ITEM_DONE ? "finished" : ""
              }`}
              key={todo.id}
              onClick={() => handleItemClick(todo.id)}
            >
              {todo.name}
            </li>
          );
        })}
      </ul>
      <AddTodo />
    </div>
  );
};
