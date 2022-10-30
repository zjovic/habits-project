import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../store/appContext";

export const SettingsTodos = () => {
  const { store, actions } = useContext(Context);

  return <div>Todos</div>;
};
