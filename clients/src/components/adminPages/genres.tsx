import React, { useMemo, useState } from "react";
import {
    Typography,
    Grid,
    Box,
    Stack,
    useMediaQuery,
    createTheme,
    ThemeProvider,
    CssBaseline,
} from "@mui/material";

import Header from "./AdminHeader";

interface genre {
    name: string;
    no_books: number;
}

const genres: genre[] = [
    {
        name: "Education",
        no_books: 30,
    },
    {
        name: "Fiction",
        no_books: 50,
    },
    {
        name: "Biography",
        no_books: 20,
    },
    {
        name: "Spritual",
        no_books: 10,
    },
];

const Genre: React.FC = () => {
    const [darkMode, setDarkMode] = useState(false);

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
                            background: "lightgray",
                        }}
                    >
                        <Box mt={4}>
                            <Grid container spacing={4} padding={4}>
                                {genres.map((genre) => (
                                    <Grid
                                        item
                                        key={genre.name}
                                        xs={12}
                                        sm={6}
                                        md={4}
                                        lg={3}
                                    >
                                        <Box
                                            boxShadow={3}
                                            padding={5}
                                            margin={2}
                                            borderRadius={2}
                                            bgcolor="white"
                                        >
                                            <Stack
                                                display="flex"
                                                flexDirection="column"
                                                alignItems="center"
                                                spacing={2}
                                            >
                                                <Typography
                                                    variant="h6"
                                                    fontWeight="bold"
                                                >
                                                    {genre.name}
                                                </Typography>
                                                <Typography variant="body2">
                                                    number of books:{" "}
                                                    {genre.no_books}
                                                </Typography>
                                            </Stack>
                                        </Box>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
};

export default Genre;
