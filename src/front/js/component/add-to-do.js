import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Link, useParams } from "react-router-dom";

export const AddTodo = () => {
  const { store, actions } = useContext(Context);
  const params = useParams();

  return (
    <div className="add-todo-container">
      <input className="habitsForm-input" type="test"></input>
      <button className="add-todo-action">Add todo</button>
    </div>
  );
};
