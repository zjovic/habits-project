import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../store/appContext";
import { RepeatIcon, ArrowRightIcon } from "../icons";
import { HabitEditModal } from "./habit-edit-modal";
import { HabitAddModal } from "./habit-add-modal";

export const SettingsHabits = () => {
  const { store, actions } = useContext(Context);

  const [habit, setHabit] = useState(null);

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

  const getHabit = (id) => {
    const habit = store.habits.find((habit) => habit.id === id);
    setHabit(habit);
  };

  return (
    <div className="HabitsSettings">
      {!store.loading ? (
        <ul className="HabitsSettings-list">
          {store.habits.map((habit) => {
            return (
              <li className="HabitsSettings-listItem" key={habit.id}>
                <div
                  className="HabitsSettingsItem"
                  data-bs-toggle="modal"
                  data-bs-target="#HabitEditModal"
                  onClick={() => getHabit(habit.id)}
                >
                  <p className="HabitsSettingsItem-name">{habit.name}</p>
                  {habit.num_of_repetitions > 0 ? <RepeatIcon /> : ""}
                </div>
                <ArrowRightIcon />
              </li>
            );
          })}
        </ul>
      ) : (
        ""
      )}
      <button
        className="Button Button--confirm"
        data-bs-toggle="modal"
        data-bs-target="#HabitAddModal"
      >
        Add new habit
      </button>
      <HabitEditModal habit={habit} />
      <HabitAddModal />
    </div>
  );
};
