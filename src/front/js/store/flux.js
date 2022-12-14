const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      token: null,
      todos: [],
      habits: [],
      userSettings: {},
      messages: [
        "Either you run the day or the day runs you.",
        "Setting goals is the first step in turning the invisible into the visible.",
        "Drop by drop is the water pot filled.",
        "Good habits are worth being fanatical about.",
        "Habits change into character.",
      ],
      loading: false,
      stats: [],
    },
    actions: {
      setLoading: (bool) => {
        setStore({ loading: bool });
      },

      registerUser: async ({ email, password, name }) => {
        try {
          const options = {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({
              email: email,
              password: password,
              name: name,
            }),
          };

          const response = await fetch(
            `${process.env.BACKEND_URL}/api/register`,
            options
          );

          if (response.status === 400) {
            const error = await response.json();
            throw error;
          }
        } catch (error) {
          console.log("error", error.msg);
        }
      },

      getJWToken: async ({ password, email }) => {
        try {
          const options = {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({
              email: email,
              password: password,
            }),
          };

          const response = await fetch(`${process.env.BACKEND_URL}/api/login`, options);

          if (response.status === 200) {
            const data = await response.json();
            sessionStorage.setItem("token", data.access_token);
          }
        } catch (error) {
          console.log("error", error);
        }
      },

      storeTokenFromSession: () => {
        const store = getStore();
        const token = sessionStorage.getItem("token");

        if (token && token != "" && token != undefined && !store.token) {
          setStore({ token: token });
        }
      },

      logout: () => {
        sessionStorage.removeItem("token");
        setStore({
          token: null,
          todos: [],
          habits: [],
        });
      },

      fetchTodos: async () => {
        try {
          const options = {
            method: "GET",
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          };
          const response = await fetch(`${process.env.BACKEND_URL}/api/todos`, options);

          if (response.status === 401) {
            getActions().logout();
            return;
          }
          const data = await response.json();

          const store = getStore();
          const currTodos = data.todos;

          setStore({ todos: currTodos });
        } catch (error) {
          console.log("Error loading todos from backend", error);
        }
      },

      addTodo: async (name) => {
        try {
          const options = {
            method: "POST",
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
              "Content-type": "application/json",
            },
            body: JSON.stringify({
              name: name,
            }),
          };

          const response = await fetch(`${process.env.BACKEND_URL}/api/todo`, options);

          if (response.status === 401) {
            getActions().logout();
            return;
          }

          if (response.status === 200) {
            const data = await response.json();
            const store = getStore();
            const currTodos = [...store.todos, data];

            setStore({ todos: currTodos });
          }
        } catch (error) {
          console.log("error", error);
        }
      },

      deleteTodo: async (id) => {
        try {
          const options = {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          };

          const response = await fetch(
            `${process.env.BACKEND_URL}/api/todo/${id}`,
            options
          );

          if (response.status === 401) {
            getActions().logout();
            return;
          }

          if (response.status === 200) {
            const data = await response.json();

            const store = getStore();
            const deleted_id = data.id;

            const filteredTodos = store.todos.filter(({ id }) => {
              return id !== deleted_id;
            });

            setStore({ todos: filteredTodos });
          }
        } catch (error) {
          console.log("error", error);
        }
      },

      deleteHabits: async (id) => {
        try {
          const options = {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          };

          const response = await fetch(
            `${process.env.BACKEND_URL}/api/habit/${id}`,
            options
          );

          if (response.status === 401) {
            getActions().logout();
            return;
          }

          if (response.status === 200) {
            const data = await response.json();

            const store = getStore();
            const deleted_id = data.id;

            const filteredHabits = store.habits.filter(({ id }) => {
              return id !== deleted_id;
            });

            setStore({ habits: filteredHabits });
            window.location.reload();
          }
        } catch (error) {
          console.log("error", error);
        }
      },

      toggleTodo: async (id) => {
        try {
          const options = {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          };

          const response = await fetch(
            `${process.env.BACKEND_URL}/api/todo/${id}`,
            options
          );

          if (response.status === 401) {
            getActions().logout();
            return;
          }

          if (response.status === 200) {
            const data = await response.json();

            const store = getStore();
            const toggled_todo_id = data.id;

            const updatedTodos = store.todos.map((todo) => {
              if (todo.id === toggled_todo_id) {
                return { ...todo, state: data.state };
              }

              return todo;
            });

            setStore({ todos: updatedTodos });
          }
        } catch (error) {
          console.log("error", error);
        }
      },

      fetchHabits: async () => {
        try {
          const options = {
            method: "GET",
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          };
          const response = await fetch(
            `${process.env.BACKEND_URL}/api/habits`,
            options
          );

          if (response.status === 401) {
            getActions().logout();
            return;
          }

          const data = await response.json();
          const currHabits = data.habits;

          setStore({ habits: currHabits });
        } catch (error) {
          console.log("Error loading habits from backend", error);
        }
      },

      addHabit: async ({ habitName, type, repetitions }) => {
        try {
          const options = {
            method: "POST",
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
              "Content-type": "application/json",
            },
            body: JSON.stringify({
              name: habitName,
              type: type,
              num_of_repetitions: repetitions,
            }),
          };

          const response = await fetch(`${process.env.BACKEND_URL}/api/habit`, options);

          if (response.status === 401) {
            getActions().logout();
            return;
          }

          if (response.status === 200) {
            const data = await response.json();
            const store = getStore();
            const currHabits = [...store.habits, data];

            setStore({ habits: currHabits });
          }
        } catch (error) {
          console.log("error", error);
        }
      },

      editHabit: async ({ id, habitName, type, repetitions, repeated }) => {
        try {
          const options = {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
              "Content-type": "application/json",
            },
            body: JSON.stringify({
              name: habitName,
              type: type,
              num_of_repetitions: repetitions,
              num_times_repeated: repeated,
            }),
          };
          const response = await fetch(
            `${process.env.BACKEND_URL}/api/habit/${id}`,
            options
          );

          if (response.status === 401) {
            getActions().logout();
            return;
          }

          const data = await response.json();
          const editedHabitId = data.id;

          const store = getStore();

          const updatedHabit = store.habits.map((habit) => {
            if (habit.id === editedHabitId) {
              return { ...data };
            }

            return habit;
          });

          setStore({ habits: updatedHabit });
        } catch (error) {
          console.log("Error loading habits from backend", error);
        }
      },

      fetchUser: async () => {
        try {
          const options = {
            method: "GET",
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          };
          const response = await fetch(`${process.env.BACKEND_URL}/api/user`, options);

          if (response.status === 401) {
            getActions().logout();
            return;
          }

          const data = await response.json();
          const userSettings = data.user;

          setStore({ userSettings: userSettings });
        } catch (error) {
          console.log("Error loading todos from backend", error);
        }
      },

      editName: async ({ name }) => {
        try {
          const options = {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
              "Content-type": "application/json",
            },
            body: JSON.stringify({
              name: name,
            }),
          };
          const response = await fetch(
            `${process.env.BACKEND_URL}/api/user/name`,
            options
          );

          if (response.status === 401) {
            getActions().logout();
            return;
          }

          const data = await response.json();
          const store = getStore();

          const updatedUserSettings = {
            ...store.userSettings,
            name: data.name,
          };

          setStore({ userSettings: updatedUserSettings });
        } catch (error) {
          console.log("Edit name error", error);
        }
      },

      editSettings: async ({ mode, lang, dayStartTime, dayEndTime }) => {
        try {
          const options = {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
              "Content-type": "application/json",
            },
            body: JSON.stringify({
              mode: mode,
              lang: lang,
              day_start: dayStartTime,
              day_end: dayEndTime,
            }),
          };
          const response = await fetch(
            `${process.env.BACKEND_URL}/api/settings`,
            options
          );

          if (response.status === 401) {
            getActions().logout();
          }

          const data = await response.json();
          const store = getStore();

          const updatedUserSettings = {
            ...store.userSettings,
            mode: data.mode,
            lang: data.lang,
            day_start: data.day_start,
            day_end: data.day_end,
          };

          setStore({ userSettings: updatedUserSettings });
        } catch (error) {
          console.log("Error loading habits from backend", error);
        }
      },

      changePassword: async ({ currentPassword, newPassword }) => {
        try {
          const options = {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
              "Content-type": "application/json",
            },
            body: JSON.stringify({
              current_password: currentPassword,
              new_password: newPassword,
            }),
          };
          const response = await fetch(
            `${process.env.BACKEND_URL}/api/password`,
            options
          );

          if (response.status === 401) {
            getActions().logout();
            return;
          }
        } catch (error) {
          console.log("Edit name error", error);
        }
      },

      finishDay: async () => {
        try {
          const options = {
            method: "POST",
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          };

          const response = await fetch(
            `${process.env.BACKEND_URL}/api/habits/reset`,
            options
          );

          if (response.status === 401) {
            getActions().logout();
            return;
          }

          if (response.status === 200) {
            const data = await response.json();
            const currHabits = data.habits;

            setStore({ habits: [] });
            setStore({ habits: currHabits });
          }
        } catch (error) {
          console.log("error", error);
        }
      },

      fetchStats: async () => {
        try {
          const options = {
            method: "GET",
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          };
          const response = await fetch(
            `${process.env.BACKEND_URL}/api/habits/stats`,
            options
          );

          if (response.status === 401) {
            getActions().logout();
            return;
          }

          if (response.status === 200) {
            const data = await response.json();
            const currStats = data.stats;

            setStore({ stats: currStats });
          }
        } catch (error) {
          console.log("Error loading habits from backend", error);
        }
      },
    },
  };
};

export default getState;
