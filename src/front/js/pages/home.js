import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import homeBg from "../../img/home_bg.jpg";
import { Link, useNavigate } from "react-router-dom";

export const Home = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  const token = sessionStorage.getItem("token");

  useEffect(() => {
    const checkToken = () => {
      if (token && token !== undefined && token !== "") {
        return navigate("/todos");
      }
    };
    checkToken();
  }, []);

  return (
    <div className="home-container">
      <img src={homeBg} className="home-bg" />
    </div>
  );
};
