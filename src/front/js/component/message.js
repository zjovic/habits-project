import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";

export const Message = () => {
  const { store, actions } = useContext(Context);

  const [message, setMessage] = useState("");

  useEffect(() => {
    const generateMessage = async () => {
      const randomIndex = Math.floor(Math.random() * store.messages.length);
      const message = store.messages[randomIndex];
      setMessage(message);
    };
    generateMessage();
  }, []);

  return <p>{message}</p>;
};
