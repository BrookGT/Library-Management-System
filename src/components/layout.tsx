import React from "react";
import { Box } from "@chakra-ui/react";
import backgroundImage from "../assets/background.jpg";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
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
