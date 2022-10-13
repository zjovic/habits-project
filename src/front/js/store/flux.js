const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      token: null,
      todos: [],
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
    },
  };
};

export default getState;
