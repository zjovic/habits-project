import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../store/appContext";

const GOOD_HABIT = 1;
const BAD_HABIT = 0;

export const HabitEditModal = ({ habit }) => {
  const { store, actions } = useContext(Context);

  const [data, setData] = useState(null);
  const [name, setName] = useState(null);
  const [type, setType] = useState(null);
  const [repetitions, setRepetitions] = useState(null);

  useEffect(() => {
    if (habit) {
      setData(habit);
      setName(habit.name);
      setType(habit.type);
      setRepetitions(habit.num_of_repetitions);
    }
  }, [habit]);

  const onChangeType = (e) => {
    setType(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name) {
      // error state
      return;
    }

    await actions.editHabit({
      id: habit.id,
      habitName: name,
      type: type,
      repetitions: repetitions,
      repeated: habit.num_times_repeated,
    });

    const modalEl = document.getElementById("HabitEditModal");
    const modal = bootstrap.Modal.getInstance(modalEl);
    modal.hide();
  };

  return (
    <div
      className="modal fade"
      id="HabitEditModal"
      tabIndex="-1"
      aria-labelledby="HabitEditModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          {data ? (
            <div className="modal-body">
              <fieldset className="habitsForm-fieldset">
                <label className="habitsForm-label" htmlFor="name">
                  Name
                </label>
                <input
                  id="name"
                  className="habitsForm-input"
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </fieldset>
              <fieldset
                className="habitsForm-fieldset"
                onChange={(e) => {
                  setType(e.target.value);
                }}
              >
                <legend className="habitsForm-legend">Type of habit</legend>
                <label className="habitsForm-label" htmlFor="type">
                  <input
                    className="habitsForm-input"
                    type="radio"
                    id="good"
                    name="type"
                    value={GOOD_HABIT}
                    defaultChecked={type === GOOD_HABIT}
                  />
                  <span>Good</span>
                </label>
                <label className="habitsForm-label" htmlFor="type">
                  <input
                    className="habitsForm-input"
                    type="radio"
                    id="bad"
                    name="type"
                    value={BAD_HABIT}
                    defaultChecked={type === BAD_HABIT}
                  />
                  <span>Bad</span>
                </label>
              </fieldset>
              <fieldset className="habitsForm-fieldset">
                <label className="habitsForm-label" htmlFor="repetitions">
                  Number of repetitions
                </label>
                <input
                  id="repetitions"
                  className="habitsForm-input"
                  type="number"
                  min="0"
                  max="99"
                  name="repetitions"
                  value={repetitions}
                  onChange={(e) => {
                    setRepetitions(e.target.value);
                  }}
                />
              </fieldset>
            </div>
          ) : (
            ""
          )}
          <div className="modal-footer">
            <button
              type="submit"
              className="Button Button--cancel"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              className="Button Button--confirm"
              onClick={handleSubmit}
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
