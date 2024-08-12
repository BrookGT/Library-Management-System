// HomePage.tsx
import React from "react";
import bgImage from "/src/assets/bluredbg.jpg";
import {
    Box,
    Flex,
    Heading,
    Text,
    Image,
    Button,
    SimpleGrid,
    Divider,
    useColorModeValue,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "./header";

const HomePage: React.FC = () => {
    const bgColor = useColorModeValue("gray.100", "gray.800");
    const footerCol = useColorModeValue("teal.500", "gray.600");
    const buttonCol = useColorModeValue("teal.500", "teal.400");

    const navigate = useNavigate();

    const handleNavigate = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        navigate("/catalog");
    };

    const MotionBox = motion(Box);

    interface Book {
        id: number;
        title: string;
        author: string;
        description: string;
        image: string;
    }

    const books: Book[] = [
        {
            id: 1,
            title: "Small Factoring Business",
            author: "Jeff Calender",
            description: "This is a description of Book Title 1.",
            image: "/src/assets/SmallFactoringBusiness by Jeff.png",
        },
        {
            id: 2,
            title: "The Purpose Driven Life",
            author: "Rick Warren",
            description: "This is a description of Book Title 2.",
            image: "/src/assets/106049.webp",
        },
        {
            id: 3,
            title: "Cracking the Coding Interview",
            author: "Gayle Laakman Mcdowell",
            description: "This is a description of Book Title 2.",
            image: "/src/assets/cracking the coding interview.png",
        },
        {
            id: 4,
            title: "The Paragmatic Programmer",
            author: "Andrew Hunt and David Thomas",
            description: "This is a description of Book Title 2.",
            image: "/src/assets/the paragmatic programmer.jpg",
        },
    ];

    return (
        <Box bg={bgColor} pt={0.1} minHeight="100vh">
            {/* Header */}
            <Header />

            <Box
                backgroundImage={`url(${bgImage})`}
                backgroundSize="cover"
                backgroundPosition="center"
                backgroundRepeat="no-repeat"
                m={2}
                borderRadius={"md"}
            >
                {/* Body Section */}
                <MotionBox
                    textAlign="center"
                    py={100}
                    color="white"
                    initial={{ y: -250 }}
                    animate={{ y: 0 }}
                    transition={{ type: "spring", stiffness: 75 }}
                >
                    <Heading>Welcome to Our Library</Heading>
                    <Text mt={4}>Discover a world of books and resources.</Text>
                    <Button
                        mt={6}
                        bg={buttonCol}
                        colorScheme={"teal"}
                        size="lg"
                        onClick={handleNavigate}
                    >
                        Explore Catalog
                    </Button>
                </MotionBox>

                {/* Overview Section */}
                <MotionBox
                    p={4}
                    pb={2}
                    bg="rgba(255, 255, 255, 0.6)"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    color={"black"}
                >
                    <Heading as="h2" size="xl" textAlign="center">
                        About Our Library
                    </Heading>
                    <Text mt={4} textAlign="center">
                        Our mission is to provide access to knowledge and
                        information for all.
                    </Text>
                    <Flex justify="center" mt={4}>
                        <Box mx={4} textAlign="center">
                            <Heading as="h3" size="md">
                                Hours
                            </Heading>
                            <Text>Mon-Fri: 8am - 8pm</Text>
                            <Text>Sat-Sun: 10am - 6pm</Text>
                        </Box>
                        <Box mx={4} textAlign="center">
                            <Heading as="h3" size="md">
                                Location
                            </Heading>
                            <Text>EAIBC</Text>
                            <Text>Addis Abeba, Ethiopia</Text>
                        </Box>
                    </Flex>
                </MotionBox>
                <Box p={3}></Box>
            </Box>

            {/* Recent Books Section */}
            <Box p={6}>
                <Heading as="h2" size="xl" textAlign="center">
                    New Arrivals
                </Heading>

                <Divider
                    ml={"5%"}
                    my={4}
                    height="1px"
                    backgroundColor="black"
                    width="90%"
                />

                <SimpleGrid
                    columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
                    spacing={4}
                >
                    {books.map((book) => (
                        <Box
                            key={book.id}
                            as={motion.div}
                            whileHover={{ scale: 1.05 }}
                            cursor="pointer"
                            boxShadow="md"
                            p={5}
                            m={2}
                            borderRadius="md"
                            bg="white"
                            color={"black"}
                        >
                            <Image
                                src={book.image}
                                alt={book.title}
                                borderRadius="md"
                                boxSize="250px"
                            />
                            <Text mt={2} fontWeight="bold" fontSize="sm">
                                {book.title}
                            </Text>
                            <Text fontSize="sm">{book.author}</Text>
                        </Box>
                    ))}
                </SimpleGrid>
            </Box>

            {/* Footer */}
            <Box
                as="footer"
                p={6}
                bg={footerCol}
                color="white"
                textAlign="center"
                m={2}
                borderRadius={"md"}
            >
                <Text>Contact Us: +251-961-090-473 | email@library.com</Text>
            </Box>
        </Box>
    );
};

export default HomePage;
