import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";
import { Link, useParams } from "react-router-dom";
import { Progress } from "./progress";

export const Habits = ({ items }) => {
  const { store, actions } = useContext(Context);
  const params = useParams();

  const BAD_HABIT = 0;
  const GOOD_HABIT = 1;

  const handlePlus = () => {
    console.log("plus");
  };

  const handleMinus = () => {
    console.log("minus");
  };

  return (
    <div>
      <ul className="habits-list">
        {items.map((item) => {
          return (
            <li className="habits-list-item" key={item.id}>
              <button className="habit-action" onClick={handleMinus}>
                -
              </button>
              <div className="habit">
                <p className="habit-name">{item.name}</p>
                {item.num_of_repetitions > 0 ? (
                  <Progress
                    num={item.num_times_repeated}
                    max={item.num_of_repetitions}
                  />
                ) : (
                  ""
                )}
              </div>
              <button className="habit-action" onClick={handlePlus}>
                +
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

Habits.propTypes = {
  items: PropTypes.array,
};
