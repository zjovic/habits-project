import React, { useState, useEffect, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { Message } from "../component/message.js";
import { List } from "../component/list.js";
import { Footer } from "../component/footer.js";
import { AddTodo } from "../component/add-to-do.js";

export const Lists = () => {
  const { store, actions } = useContext(Context);
  const params = useParams();
  const navigate = useNavigate();

  const [date, setDate] = useState("");
  const [activeTab, setActiveTab] = useState("todos");
  const [isStoreEmpty, setIsStoreEmpty] = useState(true);

  useEffect(() => {
    const getCurrentDate = async () => {
      const event = new Date();
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      setDate(event.toLocaleDateString(undefined, options));
    };
    getCurrentDate();
  }, []);

  // if no todos and no habits, fetch
  useEffect(() => {
    actions.storeTokenFromSession();

    if (!sessionStorage.getItem("token") || !store.token) {
      actions.logout();
      navigate("/");
    }
    if (isStoreEmpty) {
      actions.fetchTodos();
      actions.fetchHabits();
    }
  }, []);

  useEffect(() => {
    setIsStoreEmpty(store.todos.length === 0 && store.habits.length === 0);
  }, [store.todos, store.habits]);

  const handleTodosTab = () => {
    setActiveTab("todos");
  };

  const handleHabitsTab = () => {
    setActiveTab("habits");
  };

  return (
    <div className="lists-container">
      <div className="lists-header">
        <span className="lists-date">{date}</span>
        <Message />
      </div>
      <div className="list-tabs">
        <span
          className={`list-tab ${activeTab === "todos" ? "active" : ""}`}
          onClick={handleTodosTab}
        >
          todos
        </span>
        <span
          className={`list-tab ${activeTab === "habits" ? "active" : ""}`}
          onClick={handleHabitsTab}
        >
          habits
        </span>
      </div>
      {isStoreEmpty ? "" : <List activeTab={activeTab} />}
      {activeTab === "todos" ? <AddTodo /> : ""}
      <Footer />
    </div>
  );
};
