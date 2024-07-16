// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import SignUp from "./components/Signup";
import SignIn from "./components/SignIn";
import AdminLogIn from "./components/Admin-LogIn";

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/SignIn" element={<SignIn />} />
                <Route path="/admin-login" element={<AdminLogIn />} />
            </Routes>
        </Router>
    );
};

export default App;
