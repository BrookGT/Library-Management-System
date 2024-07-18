import logo from "/src/assets/logo.png";
import bgImage from "/src/assets/bluredbg.jpg";
import book from "/src/assets/SmallFactoringBusiness by Jeff.png";
import {
    Box,
    Flex,
    Heading,
    Text,
    Image,
    Link,
    Button,
    Grid,
    GridItem,
    HStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
    const Navigate = useNavigate();
    const navigate = (event: React.FormEvent) => {
        event.preventDefault();
        // Handle sign-in logic here, such as API calls to authenticate the user
        Navigate("/catalog");
    };

    return (
        <Box>
            {/* Header */}
            <Flex
                as="header"
                p={4}
                bg="teal.500"
                color="white"
                justify="space-between"
                align="center"
            >
                <HStack>
                    <Image src={logo} boxSize="60px" borderRadius="5px" />
                    <Text fontSize={28}>Library Management System</Text>
                </HStack>

                <Flex>
                    <Link
                        p={2}
                        href="/homepage"
                        borderRadius="md"
                        bg="rgba(255, 255, 255, 0.6)"
                        color="black"
                    >
                        Home
                    </Link>
                    <Link p={2} href="/catalog">
                        Catalog
                    </Link>
                    <Link p={2} href="/account">
                        Account
                    </Link>
                </Flex>
            </Flex>

            <Box
                backgroundImage={`url(${bgImage})`}
                backgroundSize="cover"
                backgroundPosition="center"
                backgroundRepeat="no-repeat"
            >
                {/* Hero Section */}
                <Box textAlign="center" py={100} color="white">
                    <Heading>Welcome to Our Library</Heading>
                    <Text mt={4}>Discover a world of books and resources.</Text>
                    <Button
                        mt={6}
                        colorScheme="teal"
                        size="lg"
                        onClick={navigate}
                    >
                        Explore Catalog
                    </Button>
                </Box>

                {/* Overview Section */}
                <Box p={4} pb={2} bg="rgba(255, 255, 255, 0.6)">
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
                            <Text>4 Kilo</Text>
                            <Text>Addis Abeba, Ethiopia</Text>
                        </Box>
                    </Flex>
                </Box>
                <Box p={3}></Box>
            </Box>

            {/* Recent Books Section */}
            <Box p={6} bg="#FFEBE2">
                <Heading as="h2" size="xl" textAlign="center">
                    New Arrivals
                </Heading>
                <Grid templateColumns="repeat(4, 1fr)" gap={6} mt={4}>
                    {/* Example Book Card */}
                    <GridItem>
                        <Image src={book} alt="Book Title" />
                        <Heading as="h4" size="md">
                            Book Title
                        </Heading>
                        <Text>by Author Name</Text>
                    </GridItem>
                    {/* Repeat for more books */}
                </Grid>
            </Box>

            {/* Footer */}
            <Box
                as="footer"
                p={6}
                bg="teal.500"
                color="white"
                textAlign="center"
            >
                <Text>Contact Us: +251-961-090-473 | email@library.com</Text>
            </Box>
        </Box>
    );
};
export default HomePage;
