import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";
import { Link, useParams } from "react-router-dom";
import { Progress } from "./progress";

export const HabitsItem = ({ item }) => {
  const { store, actions } = useContext(Context);
  const params = useParams();

  const [habitName, setHabitName] = useState(item.name);
  const [type, setType] = useState(item.type);
  const [repetitions, setRepetitions] = useState(item.num_of_repetitions);
  const [repeated, setRepeated] = useState(item.num_times_repeated);

  useEffect(() => {
    actions.editHabit({
      id: item.id,
      habitName: habitName,
      type: type,
      repetitions: repetitions,
      repeated: repeated,
    });
  }, [repeated]);

  return (
    <li className="habits-list-item" key={item.id}>
      <button
        className="habit-action"
        onClick={() => setRepeated(repeated - 1)}
      >
        -
      </button>
      <div className="habit">
        <p className="habit-name">{habitName}</p>
        {item.num_of_repetitions > 0 ? (
          <Progress num={repeated} max={repetitions} />
        ) : (
          ""
        )}
      </div>
      <button
        className="habit-action"
        onClick={() => setRepeated(repeated + 1)}
      >
        +
      </button>
    </li>
  );
};

HabitsItem.propTypes = {
  item: PropTypes.object,
};
