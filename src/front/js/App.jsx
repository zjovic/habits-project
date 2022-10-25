import React from "react";
import { Route, Routes, useMatch } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./pages/home";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { Settings } from "./pages/settings";
import { Habits } from "./pages/habits";
import { Todos } from "./pages/todos";
import injectContext from "./store/appContext";
import { Footer } from "./component/footer.js";
import PrivateRoutes from "./utility/private-routes";
const App = () => {
  const isLoginRoute = useMatch("/login");
  const isRegisterRoute = useMatch("/register");

  return (
    <div>
      <ScrollToTop>
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<Login />} path="/login" />
          <Route element={<Register />} path="/register" />
          <Route element={<PrivateRoutes />}>
            <Route element={<Habits />} path="/habits" />
            <Route element={<Todos />} path="/todos" />
            <Route element={<Settings />} path="/settings" />
          </Route>
          <Route element={<h1>Not found!</h1>} />
        </Routes>
        {isLoginRoute || isRegisterRoute ? "" : <Footer />}
      </ScrollToTop>
    </div>
  );
};

export default injectContext(App);
