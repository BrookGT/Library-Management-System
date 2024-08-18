import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FirstPage from "./components/loginPages/landingPage";
import SignUp from "./components/loginPages/signup";
import SignIn from "./components/loginPages/signin";
import AdminLogIn from "./components/loginPages/adminLogin";
import AdminDashboard from "./components/adminPages/adminDashboard";
import Users from "./components/adminPages/users";
import Books from "./components/adminPages/books";
import HomePage from "./components/mainPages/homePage";
import Catalog from "./components/mainPages/catalog";
import Account from "./components/mainPages/account";
import PageTransition from "./components/mainPages/pageTransition";
import MUIProvider from "./muiTheme";
import Genre from "./components/adminPages/genres";
import PrivateRoute from "./ProtectRoutes/PrivateRoutes";
import PrivateAdminRoute from "./ProtectRoutes/privateAdminRoutes";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<FirstPage />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/adminLogin" element={<AdminLogIn />} />

                {/* Protect User routes */}
                <Route element={<PrivateRoute />}>
                    <Route
                        path="/homepage"
                        element={
                            <PageTransition>
                                <HomePage />
                            </PageTransition>
                        }
                    />
                    <Route path="/catalog" element={<Catalog />} />
                    <Route path="/account" element={<Account />} />
                </Route>

                {/*Protect Admin Routes*/}
                <Route element={<PrivateAdminRoute />}>
                    <Route
                        path="/adminDashboard"
                        element={
                            <MUIProvider>
                                <AdminDashboard />
                            </MUIProvider>
                        }
                    />
                    <Route
                        path="/users"
                        element={
                            <MUIProvider>
                                <Users />
                            </MUIProvider>
                        }
                    />
                    <Route
                        path="/genres"
                        element={
                            <MUIProvider>
                                <Genre />
                            </MUIProvider>
                        }
                    />
                    <Route
                        path="/books"
                        element={
                            <MUIProvider>
                                <Books />
                            </MUIProvider>
                        }
                    />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
