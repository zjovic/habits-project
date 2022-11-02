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
  const [isRepeatable, setIsRepeatable] = useState(
    habit.num_of_repetitions > 0
  );

  useEffect(() => {
    const updateRepeated = async () => {
      try {
        actions.setLoading(true);
        await actions.editHabit({
          id: habit.id,
          habitName: habitName,
          type: type,
          repetitions: repetitions,
          repeated: repeated,
        });
        actions.setLoading(false);
      } catch (error) {
        console.log("error", error);
      }
    };

    updateRepeated();
  }, [repeated]);

  return (
    <li className="HabitsListItem" key={habit.id}>
      <button
        className={`HabitsListItem-action ${!isRepeatable ? "hidden" : ""} ${
          habit.editable ? "" : "disabled"
        }`}
        onClick={() => setRepeated(repeated - 1)}
        disabled={!habit.editable}
      >
        -
      </button>

      <div className="HabitsListItem-habit">
        <p className="HabitsListItem-name">{habitName}</p>
        {isRepeatable > 0 ? <Progress num={repeated} max={repetitions} /> : ""}
      </div>
      <button
        className={`HabitsListItem-action ${!isRepeatable ? "hidden" : ""}`}
        onClick={() => setRepeated(repeated + 1)}
        disabled={!habit.editable}
      >
        +
      </button>
    </li>
  );
};

HabitsItem.propTypes = {
  habit: PropTypes.object,
};
