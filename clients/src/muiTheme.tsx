import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

// Define your Material UI theme here if you need to customize it
const muiTheme = createTheme({
    // Your Material UI theme customizations
});

const MUIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <ThemeProvider theme={muiTheme}>
        <CssBaseline />
        {children}
    </ThemeProvider>
);

export default MUIProvider;
