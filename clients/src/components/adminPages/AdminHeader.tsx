import React, { useState } from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    List,
    ListItem,
    ListItemText,
    IconButton,
    Collapse,
    useMediaQuery,
    useTheme,
    ListItemIcon,
    Grid,
    Menu,
    MenuItem,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import ViewListIcon from "@mui/icons-material/ViewList";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import DehazeIcon from "@mui/icons-material/Dehaze";
import CloseIcon from "@mui/icons-material/Close";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import logo from "/src/assets/pngegg logo.png";
import user from "/src/assets/user.png";

interface HeaderProps {
    darkMode: boolean;
    handleToggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ darkMode, handleToggleTheme }) => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const isMidScreen = useMediaQuery(theme.breakpoints.down("md"));
    const [isOpen, setIsOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const location = useLocation();

    const handleToggle = () => setIsOpen(!isOpen);

    const activeLinkStyle = {
        border: "1px solid black",
        borderRadius: "5px",
        background: "#f0f0f0",
    };

    const getLinkStyle = (path: string) => {
        return location.pathname === path ? activeLinkStyle : {};
    };

    const handleImageClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        localStorage.removeItem("adminToken");
        handleCloseMenu();
        window.location.href = "/adminLogin";
    };

    return (
        <>
            <AppBar position="fixed" style={{ background: "teal" }}>
                <Toolbar>
                    <img
                        src={logo}
                        alt="Logo"
                        style={{ height: 40, marginRight: 16 }}
                    />
                    <Typography variant="h6" style={{ flexGrow: 1 }}>
                        Admin Dashboard
                    </Typography>

                    <IconButton onClick={handleToggleTheme} color="inherit">
                        {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
                    </IconButton>

                    <IconButton color="inherit" onClick={handleImageClick}>
                        <img
                            src={user}
                            alt="User"
                            style={{
                                height: 22,
                                width: 22,
                                borderRadius: "50%",
                            }}
                        />
                    </IconButton>

                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleCloseMenu}
                        PaperProps={{
                            style: {
                                top: "50px",
                                left: "100px",
                            },
                        }}
                    >
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>

                    <IconButton
                        color="inherit"
                        onClick={handleToggle}
                        style={{
                            display: isSmallScreen || isMidScreen ? "" : "none",
                        }}
                    >
                        {isOpen ? <CloseIcon /> : <DehazeIcon />}
                    </IconButton>
                </Toolbar>
            </AppBar>

            <Collapse
                in={isOpen}
                style={{
                    height: "100%",
                    marginTop: "65px",
                    padding: " 1rem",
                    background: "white",
                    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                    borderRadius: "5px",
                    position: "fixed",
                    zIndex: 10,
                    scrollMarginTop: "30px",
                    marginLeft: isSmallScreen ? "45%" : " 60%",
                    paddingRight: isSmallScreen ? "50%" : " 16%",
                }}
            >
                <List>
                    <ListItem
                        component={Link}
                        to="/adminDashboard"
                        style={getLinkStyle("/adminDashboard")}
                    >
                        <ListItemIcon>
                            <DashboardIcon />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" />
                    </ListItem>
                    <ListItem
                        component={Link}
                        to="/users"
                        style={getLinkStyle("/users")}
                    >
                        <ListItemIcon>
                            <PeopleIcon />
                        </ListItemIcon>
                        <ListItemText primary="Users" />
                    </ListItem>
                    <ListItem
                        component={Link}
                        to="/books"
                        style={getLinkStyle("/books")}
                    >
                        <ListItemIcon>
                            <LibraryBooksIcon />
                        </ListItemIcon>
                        <ListItemText primary="Books" />
                    </ListItem>
                    <ListItem
                        component={Link}
                        to="/genres"
                        style={getLinkStyle("/genres")}
                    >
                        <ListItemIcon>
                            <ViewListIcon />
                        </ListItemIcon>
                        <ListItemText primary="Genres" />
                    </ListItem>
                </List>
            </Collapse>

            {!isSmallScreen && !isMidScreen && (
                <Grid
                    item
                    xs={12}
                    sm={3}
                    style={{
                        backgroundColor: "lightGray",
                        padding: "20px",
                        position: "fixed",
                        top: 64,
                        bottom: 0,
                        overflowY: "auto",
                        width: "25%",
                    }}
                >
                    <List>
                        <ListItem
                            component={Link}
                            to="/adminDashboard"
                            style={getLinkStyle("/adminDashboard")}
                        >
                            <ListItemIcon>
                                <DashboardIcon />
                            </ListItemIcon>
                            <ListItemText primary="Dashboard" />
                        </ListItem>
                        <ListItem
                            component={Link}
                            to="/users"
                            style={getLinkStyle("/users")}
                        >
                            <ListItemIcon>
                                <PeopleIcon />
                            </ListItemIcon>
                            <ListItemText primary="Users" />
                        </ListItem>
                        <ListItem
                            component={Link}
                            to="/books"
                            style={getLinkStyle("/books")}
                        >
                            <ListItemIcon>
                                <LibraryBooksIcon />
                            </ListItemIcon>
                            <ListItemText primary="Books" />
                        </ListItem>
                        <ListItem
                            component={Link}
                            to="/genres"
                            style={getLinkStyle("/genres")}
                        >
                            <ListItemIcon>
                                <ViewListIcon />
                            </ListItemIcon>
                            <ListItemText primary="Genres" />
                        </ListItem>
                    </List>
                </Grid>
            )}
        </>
    );
};

export default Header;
