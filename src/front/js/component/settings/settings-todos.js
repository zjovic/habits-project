import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../store/appContext";
import { AddTodo } from "../todos/add-to-do.js";
import { TodosList } from "../todos/todos-list";

export const SettingsTodos = () => {
  const { store, actions } = useContext(Context);

  return (
    <div>
      <TodosList />
      <AddTodo />
    </div>
  );
};
