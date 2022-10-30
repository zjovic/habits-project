import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../store/appContext";
import { AddTodo } from "../add-to-do.js";
import { TodosList } from "../todos-list";

export const SettingsTodos = () => {
  const { store, actions } = useContext(Context);

  return (
    <div>
      <TodosList />
      <AddTodo />
    </div>
  );
};
