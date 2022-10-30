import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Header } from "../component/header";
import { SettingsNav } from "../component/settings/settings-nav";
import { SettingsContent } from "../component/settings/settings-content";

export const Settings = () => {
  const { store, actions } = useContext(Context);

  const [page, setPage] = useState("stats");

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

  const switchPage = (value) => {
    setPage(value);
  };

  return (
    <div className="Settings h-100">
      <Header />
      <div className="Settings-content">
        <SettingsNav switchPage={switchPage} />
        <SettingsContent currentPage={page} />
      </div>
    </div>
  );
};
