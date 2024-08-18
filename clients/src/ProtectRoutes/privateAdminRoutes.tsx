import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateAdminRoute: React.FC = () => {
    const adminToken = localStorage.getItem("adminToken");

    return adminToken ? <Outlet /> : <Navigate to="/adminLogin" />;
};

export default PrivateAdminRoute;
