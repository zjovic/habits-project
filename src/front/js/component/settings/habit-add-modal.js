import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../store/appContext";

const GOOD_HABIT = 1;
const BAD_HABIT = 0;

export const HabitAddModal = () => {
  const { store, actions } = useContext(Context);

  const [name, setName] = useState("");
  const [type, setType] = useState(GOOD_HABIT);
  const [repetitions, setRepetitions] = useState(0);

  const onChangeType = (e) => {
    setType(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name) {
      // error state
      return;
    }

    await actions.addHabit({
      habitName: name,
      type: type,
      repetitions: repetitions,
    });

    const modalEl = document.getElementById("HabitAddModal");
    const modal = bootstrap.Modal.getInstance(modalEl);
    modal.hide();

    setName("");
    setType(GOOD_HABIT);
    setRepetitions(0);
  };

  return (
    <div
      className="modal fade"
      id="HabitAddModal"
      tabIndex="-1"
      aria-labelledby="HabitAddModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-body">
            <fieldset className="HabitsForm-fieldset">
              <label className="HabitsForm-label" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                className="HabitsForm-input"
                type="text"
                name="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </fieldset>
            <fieldset
              className="HabitsForm-fieldset"
              onChange={(e) => {
                setType(e.target.value);
              }}
            >
              <legend className="HabitsForm-legend">Type of habit</legend>
              <label className="HabitsForm-label" htmlFor="type">
                <input
                  className="HabitsForm-input"
                  type="radio"
                  id="good"
                  name="type"
                  value={GOOD_HABIT}
                  defaultChecked={type === GOOD_HABIT}
                />
                <span>Good</span>
              </label>
              <label className="HabitsForm-label" htmlFor="type">
                <input
                  className="HabitsForm-input"
                  type="radio"
                  id="bad"
                  name="type"
                  value={BAD_HABIT}
                  defaultChecked={type === BAD_HABIT}
                />
                <span>Bad</span>
              </label>
            </fieldset>
            <fieldset className="HabitsForm-fieldset">
              <label className="HabitsForm-label" htmlFor="repetitions">
                Number of repetitions
              </label>
              <input
                id="repetitions"
                className="HabitsForm-input"
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
