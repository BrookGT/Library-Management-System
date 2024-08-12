import React from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    Container,
    Paper,
    Grid,
    List,
    ListItem,
    ListItemText,
    Box,
} from "@mui/material";
import MyCalendar from "./calendar"; // Import the calendar component
import { Link, Outlet } from "react-router-dom";

const AdminDashboard: React.FC = () => {
    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">Admin Dashboard</Typography>
                </Toolbar>
            </AppBar>
            <Container>
                <Grid container style={{ minHeight: "100vh" }}>
                    <Grid
                        item
                        xs={3}
                        style={{ backgroundColor: "#f0f0f0", padding: "20px" }}
                    >
                        <List>
                            <ListItem
                                button
                                component={Link}
                                to="/adminDashboard"
                            >
                                <ListItemText primary="Dashboard" />
                            </ListItem>
                            <ListItem button component={Link} to="/users">
                                <ListItemText primary="Users" />
                            </ListItem>
                            {/* Add more links as needed */}
                        </List>
                    </Grid>
                    <Grid item xs={9} style={{ padding: "20px" }}>
                        <Box
                            style={{
                                backgroundColor: "white",
                                padding: "20px",
                                borderRadius: "8px",
                                boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                            }}
                        >
                            {" "}
                            <HStack></HStack>
                            <Outlet />
                            <MyCalendar />
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

export default AdminDashboard;
