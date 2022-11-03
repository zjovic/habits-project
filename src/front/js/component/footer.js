import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import {
  Link,
  useParams,
  useMatch,
  useNavigate,
  useLocation,
} from "react-router-dom";

export const Footer = () => {
  const { store, actions } = useContext(Context);
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [redirectLabel, setRedirectLabel] = useState("");
  const [redirectRoute, setRedirectRoute] = useState("");

  const isHabitsRoute = useMatch("/habits");
  const isTodosRoute = useMatch("/todos");
  const isSettingsRoute = useMatch("/settings");
  const isLoginRoute = useMatch("/login");
  const isRegisterRoute = useMatch("/register");
  const isHomeRoute = useMatch("/");

  const isBehindLogin = isHabitsRoute || isTodosRoute || isSettingsRoute;

  useEffect(() => {
    if (isHabitsRoute || isTodosRoute) {
      setRedirectLabel("Settings");
      setRedirectRoute("/settings");
    } else if (isSettingsRoute) {
      setRedirectLabel("Todos");
      setRedirectRoute("/todos");
    }
  }, [location]);

  const handleLogout = async () => {
    await actions.logout();
    navigate("/");
  };

  const handleRedirect = () => {};

  return (
    <div>
      {isBehindLogin ? (
        <footer className="Footer">
          <Link to={redirectRoute} className="Footer-link">
            {redirectLabel}
          </Link>
          <span className="Footer-link" onClick={handleLogout}>
            Logout
          </span>
        </footer>
      ) : (
        <footer className="Footer">
          <Link to={"/login"} className="Footer-link">
            Login
          </Link>
          <Link to={"/register"} className="Footer-link">
            Register
          </Link>
        </footer>
      )}
    </div>
  );
};
