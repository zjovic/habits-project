import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Tabs } from "../component/tabs.js";
import { HabitsItem } from "../component/habit-item";
import { Header } from "../component/header";
import { FinishDayAction } from "../component/finish-day-action";

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

  if (!store.habits || store.habits.length === 0) {
    return <p>Loading</p>;
  }

  return (
    <div>
      <Header />
      <Tabs />
      <ul className="HabitsList">
        {store.habits.map((habit) => {
          return <HabitsItem habit={habit} key={habit.id} />;
        })}
      </ul>
      <FinishDayAction />
    </div>
  );
};
