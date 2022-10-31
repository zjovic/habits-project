import React, { useState, useEffect, useContext } from "react";
import { Message } from "./message.js";

export const Header = () => {
  const [date, setDate] = useState("");

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

  return (
    <div className="Header">
      <span className="Header-date">{date}</span>
      <Message />
    </div>
  );
};
