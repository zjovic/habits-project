const apiURL = "http://localhost:3001/api";

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      token: null,
      todos: [],
      habits: [],
      messages: [
        "Either you run the day or the day runs you.",
        "Setting goals is the first step in turning the invisible into the visible.",
        "Drop by drop is the water pot filled.",
        "Good habits are worth being fanatical about.",
        "Habits change into character.",
      ],
    },
    actions: {
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
          const response = await fetch(`${apiURL}/register`, options);
          if (response.status === 200) {
            setshowSuccessScreen(true);
          }
        } catch (error) {
          console.log("error", error);
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

          const response = await fetch(`${apiURL}/login`, options);

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
          const response = await fetch(`${apiURL}/todos`, options);

          if (response.status === 401) {
            getActions().logout();
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

          const response = await fetch(`${apiURL}/todo`, options);

          if (response.status === 200) {
            const data = await response.json();
            const store = getStore();
            const currTodos = data.todos;

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

          const response = await fetch(`${apiURL}/todo/${id}`, options);

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

      toggleTodo: async (id) => {
        try {
          const options = {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          };

          const response = await fetch(`${apiURL}/todo/${id}`, options);

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
          const response = await fetch(`${apiURL}/habits`, options);

          if (response.status === 401) {
            getActions().logout();
          }

          const data = await response.json();

          const store = getStore();
          const currHabits = [...store.habits, ...data.habits];

          setStore({ habits: currHabits });
        } catch (error) {
          console.log("Error loading habits from backend", error);
        }
      },

      // fetch of the new habit
      registerNewHabit: async ({ newhabits, timesaday, typeofhabit }) => {
        try {
          const options = {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({
              new_habit: newhabits,
              num_of_repetitions: timesaday,
              type: typeofhabit,
            }),
          };
          const response = await fetch(`${apiURL}/habit`, options);
          if (response.status === 200) {
            setshowSuccessScreen(true);
          }
        } catch (error) {
          console.log("error", error);
        }
      },

      
        registerNameOfTheUser: async ({ userName }) => {
          try {
            const options = {
              method: "PUT",
              headers: {
                "Content-type": "application/json",
              },
              body: JSON.stringify({
                userName: userName,
              }),
            };
            const response = await fetch(`${apiURL}/user`, options);
            if (response.status === 200) {
              setshowSuccessScreen(true);
            }
          } catch (error) {
            console.log("error", error);
          }
        },

        changePassWord: async ({ password, newPassword }) => {
          try {
            const options = {
              method: "PUT",
              headers: {
                "Content-type": "application/json",
              },
              body: JSON.stringify({
                password: password,
                newPassword: newPassword,
              }),
            };
            const response = await fetch(`${apiURL}/register`, options);
            if (response.status === 200) {
              setshowSuccessScreen(true);
            }
          } catch (error) {
            console.log("error", error);
          }
        },

        // fetch of the  Name of the User
        registerNameOfTheUser: async ({ userName }) => {
          try {
            const options = {
            method: "PUT",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({
              userName: userName,
            }),
            };
            const response = await fetch(`${apiURL}/user`, options);
            if (response.status === 200) {
            setshowSuccessScreen(true);
            }
          } catch (error) {
            console.log("error", error);
          }
          },
  
          // fetch of the  theme/mode
          registerModeOfTheUser: async ({ typeofmode }) => {
          try {
            const options = {
            method: "PUT",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({
              mode: typeofmode,
            }),
            };
            const response = await fetch(`${apiURL}/settings`, options);
            if (response.status === 200) {
            setshowSuccessScreen(true);
            }
          } catch (error) {
            console.log("error", error);
          }
          },
      
          // fetch of the change pass
          changePassWord: async ({ newPassword }) => {
          try {
            const options = {
            method: "PUT",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({
              password: newPassword,
            }),
            };
            const response = await fetch(`${apiURL}/password`, options);
            if (response.status === 200) {
            setshowSuccessScreen(true);
            }
          } catch (error) {
            console.log("error", error);
          }
          },


    },
  };
};

export default getState;
