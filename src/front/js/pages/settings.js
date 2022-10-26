import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { ProfilePhoto } from "../component/settings/profile-photo";
import { NameModal } from "../component/settings/name-modal";
import { SettingsModal } from "../component/settings/settings-modal";
import { PasswordModal } from "../component/settings/password-modal";
import { Header } from "../component/header";
import {
  ArrowRightIcon,
  SettingsIcon,
  UserIcon,
  KeyIcon,
  HabitIcon,
  TodoIcon,
} from "../component/icons";

export const Settings = () => {
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
    <div>
      <Header />
      <div className="Settings">
        {!store.loading ? (
          <div>
            <ProfilePhoto name={store.userSettings.name} />
            <ul className="SettingsList">
              <li className="SettingsList-section">
                <p className="SettingsList-sectionTitle">Settings</p>
                <div
                  className="SettingsList-item"
                  data-bs-toggle="modal"
                  data-bs-target="#settingsModal"
                >
                  <SettingsIcon />
                  <p>App settings</p>
                  <ArrowRightIcon />
                </div>
              </li>
              <li className="SettingsList-section">
                <p className="SettingsList-sectionTitle">Account</p>
                <div
                  className="SettingsList-item"
                  data-bs-toggle="modal"
                  data-bs-target="#nameModal"
                >
                  <UserIcon />
                  <p>Profile name</p>
                  <ArrowRightIcon />
                </div>
                <div
                  className="SettingsList-item"
                  data-bs-toggle="modal"
                  data-bs-target="#passwordModal"
                >
                  <KeyIcon />
                  <p>Password</p>
                  <ArrowRightIcon />
                </div>
              </li>
              <li className="SettingsList-section">
                <p className="SettingsList-sectionTitle">Habits & Todos</p>
                <div
                  className="SettingsList-item"
                  data-bs-toggle="modal"
                  data-bs-target="#nameModal"
                >
                  <HabitIcon />
                  <p>Habits</p>
                  <ArrowRightIcon />
                </div>
                <div
                  className="SettingsList-item"
                  data-bs-toggle="modal"
                  data-bs-target="#nameModal"
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
    </div>
  );
};
