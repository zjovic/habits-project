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
      registerUser: async ({ email, password }) => {
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
