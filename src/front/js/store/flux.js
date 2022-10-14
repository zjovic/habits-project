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
      setToken: (token) => {
        setStore({ token: token });
      },

      fetchTodos: async () => {
        try {
          const options = {
            method: "GET",
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          };
          const response = await fetch(
            "http://127.0.0.1:3001/api/todos",
            options
          );
          const data = await response.json();

          const store = getStore();
          const currTodos = [...store.todos, ...data.todos];

          setStore({ todos: currTodos });
        } catch (error) {
          console.log("Error loading todos from backend", error);
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
            "http://127.0.0.1:3001/api/habits",
            options
          );
          const data = await response.json();

          const store = getStore();
          const currHabits = [...store.habits, ...data.habits];

          setStore({ habits: currHabits });
        } catch (error) {
          console.log("Error loading habits from backend", error);
        }
      },
    },
  };
};

export default getState;
