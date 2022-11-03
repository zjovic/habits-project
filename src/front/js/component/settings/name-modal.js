import React, { useState, useEffect, useContext, useRef } from "react";
import { Context } from "../../store/appContext";

export const NameModal = () => {
  const { store, actions } = useContext(Context);

  const [name, setName] = useState(store.userSettings.name);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name) {
      // error state
      return;
    }

    await actions.editName({
      name: name,
    });

    const modalEl = document.getElementById("nameModal");
    const modal = bootstrap.Modal.getInstance(modalEl);
    modal.hide();
  };

  return (
    <div
      className="modal fade"
      id="nameModal"
      tabIndex="-1"
      aria-labelledby="nameModalLabel"
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
