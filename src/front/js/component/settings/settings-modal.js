import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../store/appContext";

const DARK_MODE = 0;
const LIGHT_MODE = 1;

export const SettingsModal = () => {
  const { store, actions } = useContext(Context);

  const [mode, setMode] = useState(store.userSettings.mode);
  const [lang, setLang] = useState(store.userSettings.lang);
  const [dayStartTime, setDayStartTime] = useState(
    store.userSettings.day_start
  );
  const [dayEndTime, setDayEndTime] = useState(store.userSettings.day_end);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!lang || !dayStartTime || !dayEndTime) {
      // error state
      return;
    }

    await actions.editSettings({
      mode: mode,
      lang: lang,
      dayStartTime: dayStartTime,
      dayEndTime: dayEndTime,
    });

    const modalEl = document.getElementById("settingsModal");
    const modal = bootstrap.Modal.getInstance(modalEl);
    modal.hide();
  };

  return (
    <div
      className="modal fade"
      id="settingsModal"
      tabIndex="-1"
      aria-labelledby="settingsModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-body">
            <fieldset className="form-check form-switch">
              <label
                className="form-check-label habitsForm-label"
                htmlFor="flexSwitchCheckChecked"
              >
                Dark mode
              </label>
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckChecked"
                onChange={() => {
                  mode === 1 ? setMode(DARK_MODE) : setMode(LIGHT_MODE);
                }}
                // checked={store.userSettings.mode === DARK_MODE}
              />
            </fieldset>
            <fieldset className="habitsForm-fieldset">
              <label className="habitsForm-label" htmlFor="lang">
                Choose a language:
              </label>
              <select
                name="lang"
                id="lang"
                onChange={(e) => {
                  setLang(e.target.value);
                }}
              >
                <option value="ENG">ENG</option>
                <option value="HR">HR</option>
              </select>
            </fieldset>
            <fieldset className="habitsForm-fieldset">
              <label className="habitsForm-label" htmlFor="dayStart">
                Day start:
              </label>
              <input
                type="time"
                id="dayStart"
                name="dayStart"
                value={dayStartTime}
                onChange={(e) => {
                  setDayStartTime(e.target.value);
                }}
              />
            </fieldset>
            <fieldset className="habitsForm-fieldset">
              <label className="habitsForm-label" htmlFor="dayEnd">
                Day end:
              </label>
              <input
                type="time"
                id="dayEnd"
                name="dayEnd"
                value={dayEndTime}
                onChange={(e) => {
                  setDayEndTime(e.target.value);
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
