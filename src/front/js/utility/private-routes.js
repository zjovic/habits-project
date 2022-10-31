import React, { useState, useEffect, useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { Context } from "../store/appContext";

const PrivateRoutes = () => {
  const { store, actions } = useContext(Context);
  const token = sessionStorage.getItem("token");

  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
