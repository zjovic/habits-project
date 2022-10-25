import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";
import { Progress } from "./progress";

export const HabitsItem = ({ habit }) => {
  const { store, actions } = useContext(Context);

  const [habitName, setHabitName] = useState(habit.name);
  const [type, setType] = useState(habit.type);
  const [repetitions, setRepetitions] = useState(habit.num_of_repetitions);
  const [repeated, setRepeated] = useState(habit.num_times_repeated);

  useEffect(() => {
    actions.editHabit({
      id: habit.id,
      habitName: habitName,
      type: type,
      repetitions: repetitions,
      repeated: repeated,
    });
  }, [repeated]);

  return (
    <li className="habits-list-item" key={habit.id}>
      <button
        className="habit-action"
        onClick={() => setRepeated(repeated - 1)}
      >
        -
      </button>
      <div className="habit">
        <p className="habit-name">{habitName}</p>
        {habit.num_of_repetitions > 0 ? (
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
  habit: PropTypes.object,
};
