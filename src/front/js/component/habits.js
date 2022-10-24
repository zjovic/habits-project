import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";
import { Link, useParams } from "react-router-dom";
import { HabitsItem } from "./habit-item";

export const Habits = ({ items }) => {
  const { store, actions } = useContext(Context);
  const params = useParams();

  return (
    <div>
      <ul className="habits-list">
        {items.map((item) => {
          return <HabitsItem item={item} key={item.id} />;
        })}
      </ul>
    </div>
  );
};

Habits.propTypes = {
  items: PropTypes.array,
};
