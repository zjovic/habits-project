import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Link, useParams } from "react-router-dom";

export const AddTodo = () => {
  const { store, actions } = useContext(Context);
  const params = useParams();

  const [name, setName] = useState("");

  const handleSubmit = () => {
    actions.addTodo(name);
    setName("");
  };

  return (
    <div className="add-todo-container">
      <input
        className="habitsForm-input"
        type="text"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      ></input>
      <button className="add-todo-action" onClick={handleSubmit}>
        Add todo
      </button>
    </div>
  );
};
