import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../store/appContext";
import { ProfilePhoto } from "./profile-photo";
import { NameModal } from "./name-modal";
import { SettingsModal } from "./settings-modal";
import { PasswordModal } from "./password-modal";
import {
  ArrowRightIcon,
  SettingsIcon,
  UserIcon,
  KeyIcon,
  HabitIcon,
  TodoIcon,
} from "../icons";

export const SettingsNav = ({ switchPage }) => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    if (Object.keys(store.userSettings).length === 0) {
      const getUserData = async () => {
        try {
          actions.setLoading(true);
          await actions.fetchUser();
          actions.setLoading(false);
        } catch (error) {
          console.log(error);
        }
      };

      getUserData();
    }
  }, []);

  return (
    <div className="SettingsNav h-100">
      {!store.loading ? (
        <div>
          <ProfilePhoto name={store.userSettings.name} />
          <ul className="SettingsNavList">
            <li className="SettingsNavList-section">
              <p className="SettingsNavList-sectionTitle">Settings</p>
              <div
                className="SettingsNavList-item"
                data-bs-toggle="modal"
                data-bs-target="#settingsModal"
              >
                <SettingsIcon />
                <p>App settings</p>
                <ArrowRightIcon />
              </div>
            </li>
            <li className="SettingsNavList-section">
              <p className="SettingsNavList-sectionTitle">Account</p>
              <div
                className="SettingsNavList-item"
                data-bs-toggle="modal"
                data-bs-target="#nameModal"
              >
                <UserIcon />
                <p>Profile name</p>
                <ArrowRightIcon />
              </div>
              <div
                className="SettingsNavList-item"
                data-bs-toggle="modal"
                data-bs-target="#passwordModal"
              >
                <KeyIcon />
                <p>Password</p>
                <ArrowRightIcon />
              </div>
            </li>
            <li className="SettingsNavList-section">
              <p className="SettingsNavList-sectionTitle">Habits & Todos</p>
              <div
                className="SettingsNavList-item"
                onClick={() => switchPage("habits")}
              >
                <HabitIcon />
                <p>Habits</p>
                <ArrowRightIcon />
              </div>
              <div
                className="SettingsNavList-item"
                onClick={() => switchPage("todos")}
              >
                <TodoIcon />
                <p>Todos</p>
                <ArrowRightIcon />
              </div>
            </li>
          </ul>
          <NameModal />
          <SettingsModal />
          <PasswordModal />
        </div>
      ) : (
        <p>Loading</p>
      )}
    </div>
  );
};
