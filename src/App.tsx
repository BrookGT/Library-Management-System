import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/LogIn/Home";
import SignUp from "./components/LogIn/Signup";
import SignIn from "./components/LogIn/SignIn";
import AdminLogIn from "./components/LogIn/Admin-LogIn";
import AdminDashboard from "./components/adminPages/admin-dashboard";
import Users from "./components/adminPages/users";
import HomePage from "./components/mainPages/homepage";
import Catalog from "./components/mainPages/catalog";
import Account from "./components/mainPages/account";

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/admin-login" element={<AdminLogIn />} />
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/users" element={<Users />} />
                <Route path="/homepage" element={<HomePage />} />
                <Route path="/catalog" element={<Catalog />} />
                <Route path="/account" element={<Account />} />
            </Routes>
        </Router>
    );
};

export default App;
