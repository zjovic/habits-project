import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Context } from "../../store/appContext";
import { Progress } from "./progress";

export const HabitsItem = ({ habit }) => {
  const { store, actions } = useContext(Context);

  // const [habitName, setHabitName] = useState(habit.name);
  // const [type, setType] = useState(habit.type);
  // const [repetitions, setRepetitions] = useState(habit.num_of_repetitions);
  const [repeated, setRepeated] = useState(habit.num_times_repeated);
  // const [isRepeatable, setIsRepeatable] = useState(
  //   habit.num_of_repetitions > 0
  // );
  // const [update, setUpdate] = useState(false);

  useEffect(() => {
    const updateRepeated = async () => {
      try {
        await actions.editHabit({
          id: habit.id,
          habitName: habit.name,
          type: habit.type,
          repetitions: habit.num_of_repetitions,
          repeated: repeated,
        });
      } catch (error) {
        console.log(error);
      }
    };

    updateRepeated();
  }, [repeated]);

  return (
    <li className="HabitsListItem" key={habit.id}>
      <button
        className={`HabitsListItem-action ${
          !habit.num_of_repetitions > 0 ? "hidden" : ""
        } ${habit.editable ? "" : "disabled"}`}
        onClick={() => {
          if (repeated > 0) {setRepeated(repeated - 1)} 
          // else setRepeated(0)
          }
        }
        disabled={!habit.editable || store.loading}
      >
        -
      </button>

      <div className="HabitsListItem-habit">
        <p className="HabitsListItem-name">{habit.name}</p>
        {habit.num_of_repetitions > 0 ? (
          <Progress num={repeated} max={habit.num_of_repetitions} />
        ) : (
          ""
        )}
      </div>
      <button
        className={`HabitsListItem-action ${
          !habit.num_of_repetitions > 0 ? "hidden" : ""
        }`}
        onClick={() => setRepeated(repeated + 1)}
        disabled={!habit.editable || store.loading}
      >
        +
      </button>
    </li>
  );
};

HabitsItem.propTypes = {
  habit: PropTypes.object,
};
