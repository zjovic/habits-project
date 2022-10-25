import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Tabs } from "../component/tabs.js";
import { HabitsItem } from "../component/habit-item";
import { Header } from "../component/header";

export const Habits = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    if (store.habits.length === 0) {
      const getHabits = async () => {
        try {
          actions.setLoading(true);
          await actions.fetchHabits();
          actions.setLoading(false);
        } catch (error) {
          console.log(error);
        }
      };

      getHabits();
    }
  }, []);

  return (
    <div>
      <Header />
      <Tabs />
      <ul className="habits-list">
        {store.habits.map((habit) => {
          return <HabitsItem habit={habit} key={habit.id} />;
        })}
      </ul>
    </div>
  );
};
