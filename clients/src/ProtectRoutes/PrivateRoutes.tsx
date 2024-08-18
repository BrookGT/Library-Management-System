import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute: React.FC = () => {
    const token = localStorage.getItem("userToken");

    return token ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
