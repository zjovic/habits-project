import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Tabs } from "../component/tabs.js";
import { Header } from "../component/header.js";
import { AddTodo } from "../component/todos/add-to-do.js";
import { TodosList } from "../component/todos/todos-list";

export const Todos = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="Todos">
      <Header />
      <Tabs />
      <TodosList />
      <AddTodo />
    </div>
  );
};
