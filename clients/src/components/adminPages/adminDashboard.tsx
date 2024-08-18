import React, { useState, useMemo, useEffect } from "react";
import {
    Grid,
    Box,
    Stack,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    useMediaQuery,
    CssBaseline,
    Typography,
} from "@mui/material";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    BarChart,
    Bar,
} from "recharts";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";
import MyCalendar from "./calendar";
import Header from "./AdminHeader";
import bgtext from "/src/assets/bgtext.jpg";
import userImage from "/src/assets/user11png.png"; // Import images
import bookImage from "/src/assets/book.png";
import genresImage from "/src/assets/genres.png";
import topUserImage from "/src/assets/userspng1.png";
import axios from "axios";

// Sample data for charts
const data = [
    { name: "Week 1", borrowed: 4000, returned: 2400, amt: 2400 },
    { name: "Week 2", borrowed: 3000, returned: 1398, amt: 2210 },
    { name: "Week 3", borrowed: 2000, returned: 9800, amt: 2290 },
    { name: "Week 4", borrowed: 2780, returned: 3908, amt: 2000 },
    { name: "Week 5", borrowed: 1890, returned: 4800, amt: 2181 },
    { name: "Week 6", borrowed: 2390, returned: 3800, amt: 2500 },
    { name: "Week 7", borrowed: 3490, returned: 4300, amt: 2100 },
];

const AdminDashboard: React.FC = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [totalUsers, setTotalUsers] = useState<number | null>(null);
    const [totalBooks, setTotalBooks] = useState<number | null>(null);
    const [mostBorrowedBook, setMostBorrowedBook] = useState<{
        title: string;
        image_url: string;
    }>({ title: "", image_url: "" });
    const [topUser, setTopUser] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode: darkMode ? "dark" : "light",
                },
            }),
        [darkMode]
    );

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const [
                    totalUsersRes,
                    totalBooksRes,
                    mostBorrowedBookRes,
                    topUserRes,
                ] = await Promise.all([
                    axios.get("http://localhost:5000/api/totalUsers"),
                    axios.get("http://localhost:5000/api/totalBooks"),
                    axios.get("http://localhost:5000/api/mostBorrowedBook"),
                    axios.get("http://localhost:5000/api/topUser"),
                ]);

                setTotalUsers(totalUsersRes.data.total_users);
                setTotalBooks(totalBooksRes.data.total_books);
                setMostBorrowedBook({
                    title: mostBorrowedBookRes.data.title,
                    image_url: mostBorrowedBookRes.data.image_url,
                });
                setTopUser(topUserRes.data.name);
            } catch (error) {
                console.error("Failed to fetch dashboard data:", error);
                setError(
                    "Unable to load dashboard data. Please try again later."
                );
            }
        };

        fetchDashboardData();
    }, []);

    const handleToggleTheme = () => {
        setDarkMode((prevMode) => !prevMode);
    };

    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const isMidScreen = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Header darkMode={darkMode} handleToggleTheme={handleToggleTheme} />
            <Grid container style={{ minHeight: "100vh" }}>
                <Grid
                    item
                    xs={12}
                    sm={isMidScreen ? 12 : 9}
                    style={{
                        padding: "20px",
                        marginLeft: isSmallScreen || isMidScreen ? 0 : "25%",
                        width: isSmallScreen || isMidScreen ? "100%" : "75%",
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
                            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                            width: "100%",
                        }}
                    >
                        <Box
                            style={{
                                backgroundImage: `url(${bgtext})`,
                                padding: "20px",
                                margin: "0 0 8px 0",
                                borderRadius: "8px",
                                boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                                backgroundSize: "cover",
                                color: "white",
                                width: "100%",
                            }}
                        >
                            <Typography variant="h6">
                                Welcome Back Admin
                            </Typography>
                        </Box>

                        {error && (
                            <Typography color="error">{error}</Typography>
                        )}

                        <Stack
                            direction={isSmallScreen ? "column" : "row"}
                            spacing={2}
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Card
                                sx={{
                                    width: isSmallScreen ? "100%" : 345,
                                    backgroundColor: "#f9f9f9",
                                }}
                            >
                                <CardActionArea component={Link} to="/users">
                                    <CardMedia
                                        component="img"
                                        image={userImage}
                                        alt="Total Users"
                                        style={{
                                            height: "140px",
                                            objectFit: "contain",
                                        }}
                                    />
                                    <CardContent>
                                        <Typography
                                            gutterBottom
                                            variant="h5"
                                            component="div"
                                        >
                                            Total Users
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            {totalUsers}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                            <Card
                                sx={{
                                    width: isSmallScreen ? "100%" : 345,
                                    backgroundColor: "#f9f9f9",
                                }}
                            >
                                <CardActionArea component={Link} to="/books">
                                    <CardMedia
                                        component="img"
                                        image={bookImage}
                                        alt="Total Books"
                                        style={{
                                            height: "140px",
                                            objectFit: "contain",
                                        }}
                                    />
                                    <CardContent>
                                        <Typography
                                            gutterBottom
                                            variant="h5"
                                            component="div"
                                        >
                                            Total Books
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            {totalBooks}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                            <Card
                                sx={{
                                    width: isSmallScreen ? "100%" : 345,
                                    backgroundColor: "#f9f9f9",
                                }}
                            >
                                <CardActionArea component={Link} to="/genres">
                                    <CardMedia
                                        component="img"
                                        image={genresImage}
                                        alt="Total Genres"
                                        style={{
                                            height: "140px",
                                            objectFit: "contain",
                                        }}
                                    />
                                    <CardContent>
                                        <Typography
                                            gutterBottom
                                            variant="h5"
                                            component="div"
                                        >
                                            Total Genres
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            12
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Stack>

                        <Stack
                            direction={isSmallScreen ? "column" : "row"}
                            spacing={2}
                            justifyContent="center"
                            alignItems="center"
                            marginTop={2}
                        >
                            <Card
                                sx={{
                                    width: isSmallScreen ? "100%" : 345,
                                    backgroundColor: "#f9f9f9",
                                }}
                            >
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        image={mostBorrowedBook.image_url}
                                        alt="Most Borrowed Book"
                                        style={{
                                            height: "140px",
                                            objectFit: "contain",
                                        }}
                                    />
                                    <CardContent>
                                        <Typography
                                            gutterBottom
                                            variant="h5"
                                            component="div"
                                        >
                                            Most Borrowed Book
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            {mostBorrowedBook.title}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                            <Card
                                sx={{
                                    width: isSmallScreen ? "100%" : 345,
                                    backgroundColor: "#f9f9f9",
                                }}
                            >
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        image={topUserImage}
                                        alt="Top User"
                                        style={{
                                            height: "140px",
                                            objectFit: "contain",
                                        }}
                                    />
                                    <CardContent>
                                        <Typography
                                            gutterBottom
                                            variant="h5"
                                            component="div"
                                        >
                                            Top User
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            {topUser}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Stack>

                        <Stack
                            direction={isSmallScreen ? "column" : "row"}
                            spacing={2}
                            justifyContent="center"
                            alignItems="center"
                            marginTop={2}
                        >
                            <Card
                                sx={{
                                    width: "100%",
                                    backgroundColor: "#f9f9f9",
                                }}
                            >
                                <CardContent>
                                    <Typography
                                        gutterBottom
                                        variant="h5"
                                        component="div"
                                    >
                                        Weekly Statistics
                                    </Typography>
                                    <LineChart
                                        width={
                                            isSmallScreen || isMidScreen
                                                ? 600
                                                : 800
                                        }
                                        height={300}
                                        data={data}
                                        margin={{
                                            top: 5,
                                            right: 30,
                                            left: 20,
                                            bottom: 5,
                                        }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Line
                                            type="monotone"
                                            dataKey="borrowed"
                                            stroke="#8884d8"
                                            activeDot={{ r: 8 }}
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="returned"
                                            stroke="#82ca9d"
                                        />
                                    </LineChart>
                                </CardContent>
                            </Card>
                        </Stack>

                        <Stack
                            direction={isSmallScreen ? "column" : "row"}
                            spacing={2}
                            justifyContent="center"
                            alignItems="center"
                            marginTop={2}
                        >
                            <Card
                                sx={{
                                    width: "100%",
                                    backgroundColor: "#f9f9f9",
                                }}
                            >
                                <CardContent>
                                    <Typography
                                        gutterBottom
                                        variant="h5"
                                        component="div"
                                    >
                                        Top Users This Week
                                    </Typography>
                                    <BarChart
                                        width={
                                            isSmallScreen || isMidScreen
                                                ? 600
                                                : 800
                                        }
                                        height={300}
                                        data={data}
                                        margin={{
                                            top: 5,
                                            right: 30,
                                            left: 20,
                                            bottom: 5,
                                        }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar
                                            dataKey="borrowed"
                                            fill="#8884d8"
                                        />
                                        <Bar
                                            dataKey="returned"
                                            fill="#82ca9d"
                                        />
                                    </BarChart>
                                </CardContent>
                            </Card>
                        </Stack>

                        <Stack
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                            marginTop={2}
                        >
                            <Card
                                sx={{
                                    width: "100%",
                                    backgroundColor: "#f9f9f9",
                                }}
                            >
                                <CardContent>
                                    <Typography
                                        gutterBottom
                                        variant="h5"
                                        component="div"
                                    >
                                        Admin Calendar
                                    </Typography>
                                    <MyCalendar />
                                </CardContent>
                            </Card>
                        </Stack>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
};

export default AdminDashboard;
