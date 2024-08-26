import React, { useMemo, useState, useEffect } from "react";
import {
    Typography,
    Grid,
    Box,
    Stack,
    useMediaQuery,
    createTheme,
    ThemeProvider,
    CssBaseline,
    Button,
} from "@mui/material";
import axios from "axios";
import Header from "./AdminHeader";

interface User {
    id: number;
    username: string;
    email: string;
    books_borrowed: number;
    books_returned: number;
}

const Users: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [darkMode, setDarkMode] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:5000/api/users",
                    {
                        params: {
                            page: currentPage,
                            limit: 8,
                        },
                    }
                );
                setUsers(response.data.users);
                setTotalPages(response.data.totalPages);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, [currentPage]);

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode: darkMode ? "dark" : "light",
                },
            }),
        [darkMode]
    );
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const isMidScreen = useMediaQuery(theme.breakpoints.down("md"));

    const handleToggleTheme = () => {
        setDarkMode((prevMode) => !prevMode);
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Header darkMode={darkMode} handleToggleTheme={handleToggleTheme} />

            <Grid container style={{ minHeight: "100vh" }}>
                <Grid
                    item
                    xs={12}
                    sm={12}
                    style={{
                        padding: "20px",
                        marginLeft: isSmallScreen || isMidScreen ? 0 : "25%",
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: "60px",
                    }}
                >
                    <Box
                        style={{
                            backgroundColor: "white",
                            padding: "20px",
                            borderRadius: "8px",
                            boxShadow: "0 0 10px rgba(0,0,0,0.4)",
                            background: "rgba(0,0,0,0.05)",
                            width: "100%",
                            maxWidth: "1200px",
                        }}
                    >
                        <Box mt={4}>
                            <Grid
                                container
                                spacing={4}
                                padding={4}
                                justifyContent={
                                    users.length === 1 ? "center" : "flex-start"
                                }
                            >
                                {users.map((user) => (
                                    <Grid
                                        item
                                        key={user.id}
                                        xs={12}
                                        sm={6}
                                        md={4}
                                        lg={4}
                                        style={{ display: "flex" }}
                                    >
                                        <Box
                                            boxShadow={3}
                                            padding={4}
                                            borderRadius={2}
                                            bgcolor="white"
                                            flex="1"
                                            display="flex"
                                            flexDirection="column"
                                            justifyContent="center"
                                            alignItems="center"
                                            height="100%"
                                            minHeight="200px"
                                        >
                                            <Stack
                                                display="flex"
                                                flexDirection="column"
                                                alignItems="center"
                                                spacing={2}
                                                textAlign="center"
                                            >
                                                <Typography
                                                    variant="h6"
                                                    fontWeight="bold"
                                                >
                                                    {user.username}
                                                </Typography>
                                                <Typography variant="body2">
                                                    {user.email}
                                                </Typography>
                                                <Typography variant="body2">
                                                    Books Borrowed:{" "}
                                                    {user.books_borrowed}
                                                </Typography>
                                                <Typography variant="body2">
                                                    Books Returned:{" "}
                                                    {user.books_returned}
                                                </Typography>
                                            </Stack>
                                        </Box>
                                    </Grid>
                                ))}
                            </Grid>
                            <Box
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                m={4}
                            >
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handlePreviousPage}
                                    disabled={currentPage === 1}
                                    style={{ marginRight: "10px" }}
                                >
                                    Previous
                                </Button>
                                <Typography variant="body1">
                                    Page {currentPage} of {totalPages}
                                </Typography>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleNextPage}
                                    disabled={currentPage === totalPages}
                                    style={{ marginLeft: "10px" }}
                                >
                                    Next
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
};

export default Users;
