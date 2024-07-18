import React from "react";
import { Box, Button, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import backgroundImage from "/src/assets/background.jpg";

const Home: React.FC = () => {
    return (
        <Box
            bgImage={`url(${backgroundImage})`}
            bgSize="cover"
            bgPosition="center"
            minH="100vh"
            display="flex"
            alignItems="center"
            justifyContent="center"
        >
            <VStack
                spacing={4}
                bg="rgba(255, 255, 255, 0.8)"
                p={8}
                borderRadius="md"
            >
                <Heading>Welcome to our Library Management System</Heading>
                <Text>
                    If you don't have an account, please sign up. If you already
                    have an account, please sign in.
                </Text>
                <HStack>
                    <Button as={Link} to="/signup" colorScheme="teal">
                        Sign Up
                    </Button>
                    <Button as={Link} to="/signin" colorScheme="teal">
                        Sign In
                    </Button>
                    <Button as={Link} to="/admin-login" colorScheme="teal">
                        Admin
                    </Button>
                </HStack>
            </VStack>
        </Box>
    );
};

export default Home;
