import React from "react";
import { Box } from "@chakra-ui/react";
import backgroundImage from "/src/assets/background.jpg";

const Layout = ({ children }) => {
    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            minH="100vh"
            bgImage={`url(${backgroundImage})`}
            bgPosition="center"
            bgRepeat="no-repeat"
            bgSize="cover"
            p={4}
        >
            {children}
        </Box>
    );
};

export default Layout;
