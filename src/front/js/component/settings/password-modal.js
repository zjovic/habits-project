import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../store/appContext";
import { useNavigate } from "react-router-dom";

export const PasswordModal = () => {
  const { store, actions } = useContext(Context);

  const navigate = useNavigate();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [changePassword, setChangePassword] = useState("");

  const passwordMatch = (e) => {
    return newPassword === changePassword;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!passwordMatch || !newPassword) {
      // error stae
      return;
    }

    await actions.changePassword({
      currentPassword: currentPassword,
      newPassword: newPassword,
    });

    await actions.logout();

    const modalEl = document.getElementById("passwordModal");
    const modal = bootstrap.Modal.getInstance(modalEl);
    modal.hide();

    navigate("/");
  };

  return (
    <div
      className="modal fade"
      id="passwordModal"
      tabIndex="-1"
      aria-labelledby="passwordModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-body">
            <fieldset className="HabitsForm-fieldset">
              <label className="HabitsForm-label" htmlFor="currentPassword">
                Current password
              </label>
              <input
                id="currentPassword"
                className="HabitsForm-input"
                type="password"
                name="currentPassword"
                value={currentPassword}
                onChange={(e) => {
                  setCurrentPassword(e.target.value);
                }}
              />
            </fieldset>
            <fieldset className="HabitsForm-fieldset">
              <label className="HabitsForm-label" htmlFor="newPassword">
                New password
              </label>
              <input
                id="newPassword"
                className="HabitsForm-input"
                type="password"
                name="newPassword"
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                }}
              />
            </fieldset>
            <fieldset className="HabitsForm-fieldset">
              <label className="HabitsForm-label" htmlFor="changePassword">
                Repeat new password
              </label>
              <input
                id="changePassword"
                className="HabitsForm-input"
                type="password"
                name="changePassword"
                value={changePassword}
                onChange={(e) => {
                  setChangePassword(e.target.value);
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
