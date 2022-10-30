import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../store/appContext";

export const SettingsStats = () => {
  const { store, actions } = useContext(Context);

  return <div>Stats</div>;
};
