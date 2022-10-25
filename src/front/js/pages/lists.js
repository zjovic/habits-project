import React, { useState, useEffect, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { Message } from "../component/message.js";
import { List } from "../component/list.js";
import { Footer } from "../component/footer.js";
import { AddTodo } from "../component/add-to-do.js";
import { Tabs } from "../component/tabs.js";

export const Lists = () => {
  const { store, actions } = useContext(Context);
  const params = useParams();
  const navigate = useNavigate();

  const [date, setDate] = useState("");
  const [activeTab, setActiveTab] = useState("todos");
  const [listHasItems, setListHasItems] = useState(false);

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

  // useEffect(() => {
  //   actions.storeTokenFromSession();

  //   if (!sessionStorage.getItem("token") || !store.token) {
  //     actions.logout();
  //     navigate("/");
  //   }
  // }, []);

  useEffect(() => {
    if (store.todos.length !== 0 || store.habits.length !== 0) {
      setListHasItems(true);
    } else {
      setListHasItems(false);
    }
  }, [store.todos, store.habits]);

  const handleTabToggle = (tab) => {
    tab === "todos" ? setActiveTab("todos") : setActiveTab("habits");
  };

  return (
    <div className="lists-container">
      <div className="lists-header">
        <span className="lists-date">{date}</span>
        <Message />
      </div>
      <Tabs handleTabToggle={handleTabToggle} />
      {listHasItems ? <List activeTab={activeTab} /> : ""}
      {activeTab === "todos" ? <AddTodo /> : ""}
      <Footer />
    </div>
  );
};
