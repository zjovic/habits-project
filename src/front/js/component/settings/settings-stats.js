import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../store/appContext";

export const SettingsStats = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    const getStats = async () => {
      try {
        actions.setLoading(true);
        await actions.fetchStats();
        actions.setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    getStats();
  }, []);

  if (!store.stats || store.loading) {
    return <p>Loading</p>;
  }

  return (
    <div>
      <ul className="Stats">
        {store.stats.map((stat) => {
          return (
            <li key={stat.id}>
              <p>type: {stat.type}</p>
              <p>date: {stat.created_at}</p>
              <p>repetitions: {stat.reps}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
