import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FirstPage from "./components/loginPages/firstPage";
import SignUp from "./components/loginPages/signup";
import SignIn from "./components/loginPages/signin";
import AdminLogIn from "./components/loginPages/adminLogin";
import AdminDashboard from "./components/adminPages/adminDashboard";
import Users from "./components/adminPages/users";
import HomePage from "./components/mainPages/homepage";
import Catalog from "./components/mainPages/catalog";
import Account from "./components/mainPages/account";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<FirstPage />} />
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
