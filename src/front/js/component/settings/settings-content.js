import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../store/appContext";
import { SettingsStats } from "./settings-stats";
import { SettingsHabits } from "./settings-habits";
import { SettingsTodos } from "./settings-todos";
import PropTypes from "prop-types";

export const SettingsContent = ({ currentPage }) => {
  const { store, actions } = useContext(Context);

  return (
    <div className="SettingsContent">
      {(() => {
        if (currentPage === "habits") {
          return <SettingsHabits />;
        } else if (currentPage === "todos") {
          return <SettingsTodos />;
        } else {
          return <SettingsStats />;
        }
      })()}
    </div>
  );
};

SettingsContent.propTypes = {
  currentPage: PropTypes.string,
};
