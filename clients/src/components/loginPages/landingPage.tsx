import React, { useEffect, useState } from "react";
import { Box, Button, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import animationF from "/src/assets/V0gC5bOMq5.json";
import animationFile from "/src/assets/Animation - 1721851999733.json";
import { AnimatePresence, motion } from "framer-motion";

const animations = [
    { data: animationF, key: "animationF" },
    { data: animationFile, key: "animationFile" },
];

const animationDuration = 5000; // Duration of each animation in milliseconds

const FirstPage: React.FC = () => {
    const [currentAnimationIndex, setCurrentAnimationIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentAnimationIndex(
                (prevIndex: number) => (prevIndex + 1) % animations.length
            );
        }, animationDuration);

        return () => clearInterval(interval);
    }, []);

    return (
        <VStack
            bg="linear-gradient(135deg, rgba(0, 128, 128, 0.9) 0%, rgba(0, 0, 0, 1) 30%, rgba(0, 0, 0, 1) 70%, rgba(0, 43, 226, 0.9) 100%)"
            width="100%"
            bgSize="cover"
            bgPosition="center"
            minH="100vh"
            display="flex"
            alignItems="center"
            justifyContent="center"
        >
            <Heading
                color="white"
                textAlign="center"
                p={8}
                m={2}
                fontSize={{ base: 21, lg: 28, md: 25, sm: 22 }}
            >
                Welcome to our Library Management System
            </Heading>

            <AnimatePresence mode="wait">
                <motion.div
                    key={animations[currentAnimationIndex].key}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 1 }}
                >
                    <Lottie
                        animationData={animations[currentAnimationIndex].data}
                        style={{ width: "100%", height: "60vh" }}
                    />
                </motion.div>
            </AnimatePresence>

            <Text color="white" m={2} p={2} align="center">
                If you don't have an account, please sign up. If you already
                have an account, please sign in.
            </Text>
            <HStack pb={4}>
                <Button as={Link} to="/signup" colorScheme="teal">
                    Sign Up
                </Button>
                <Button as={Link} to="/signin" colorScheme="teal">
                    Sign In
                </Button>
                <Button as={Link} to="/adminlogin" colorScheme="teal">
                    Admin
                </Button>
            </HStack>
        </VStack>
    );
};

export default FirstPage;
