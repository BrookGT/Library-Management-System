import React, { useState } from "react";
import logo from "/src/assets/logo.png";
import {
    Box,
    Flex,
    Heading,
    Text,
    Image,
    Link,
    HStack,
    SimpleGrid,
    VStack,
    IconButton,
    Collapse,
} from "@chakra-ui/react";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";

interface User {
    id: number;
    username: string;
    email: string;
    booksBorrowed: number;
    booksReturned: number;
}

const users: User[] = [
    {
        id: 1,
        username: "BirukGT",
        email: "Bura@example.com",
        booksBorrowed: 3,
        booksReturned: 2,
    },
    {
        id: 2,
        username: "AbebeTT",
        email: "Abe@example.com",
        booksBorrowed: 5,
        booksReturned: 5,
    },
    {
        id: 3,
        username: "TesfaMM",
        email: "tesfa@example.com",
        booksBorrowed: 2,
        booksReturned: 1,
    },
    {
        id: 4,
        username: "Dawit_GG",
        email: "Dave@example.com",
        booksBorrowed: 4,
        booksReturned: 4,
    },
];

const Users: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const handleToggle = () => setIsOpen(!isOpen);
    const linkStyles = {
        p: "2",
        _hover: {
            borderRadius: "md",
            bg: "rgba(255, 255, 255, 0.6)",
        },
    };
    const linkStylesC = {
        p: "2",
        pr: "80%",
        _hover: {
            borderRadius: "md",
            bg: "rgba(255, 255, 255, 0.6)",
        },
    };
    return (
        <>
            <Flex
                as="header"
                p={6}
                bg="gray.200"
                color="black"
                justify="space-between"
                align="center"
            >
                <Heading>
                    <HStack>
                        <Image src={logo} boxSize="60px" borderRadius="5px" />
                        <Text fontSize={{ base: 18, lg: 28, md: 25, sm: 20 }}>
                            Admin Dashboard
                        </Text>
                    </HStack>
                </Heading>

                <Flex
                    display={{
                        base: "none",
                        lg: "flex",
                        md: "flex",
                        sm: "flex",
                    }}
                >
                    <Link p={2} href="./adminDashboard" sx={linkStyles}>
                        Home
                    </Link>
                    <Link p={2} href="./users" sx={linkStyles}>
                        Users
                    </Link>
                </Flex>
                <Box
                    display={{
                        base: "flex",
                        lg: "none",
                        md: "none",
                        sm: "none",
                    }}
                >
                    <IconButton
                        aria-label="Toggle Navigation"
                        icon={
                            isOpen ? (
                                <CloseIcon color="black" />
                            ) : (
                                <HamburgerIcon color="black" />
                            )
                        }
                        onClick={handleToggle}
                        colorScheme="white"
                        boxShadow="lg"
                        size="lg"
                    />
                </Box>
            </Flex>

            <Collapse in={isOpen}>
                <VStack
                    spacing={4}
                    align="start"
                    p={2}
                    mb={3}
                    pl={8}
                    bg="rgba(255, 255, 255, 0.5)"
                    borderRadius="md"
                >
                    <Link href="/adminDashboard" sx={linkStylesC}>
                        Home
                    </Link>

                    <Link href="/users" sx={linkStylesC}>
                        Users
                    </Link>
                </VStack>
            </Collapse>

            <Heading
                as="h2"
                size="xl"
                textAlign="center"
                mt={4}
                pb={1}
                mx={50}
                borderBottom="1px solid black"
            >
                List of Users
            </Heading>
            <SimpleGrid
                columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
                spacing={4}
                p={4}
            >
                {users.map((user) => (
                    <Box
                        key={user.id}
                        boxShadow="md"
                        p={5}
                        m={2}
                        borderRadius="md"
                        bg="gray.50"
                    >
                        <VStack spacing={2}>
                            <Text fontWeight="bold" fontSize="lg">
                                {user.username}
                            </Text>
                            <Text fontSize="sm">{user.email}</Text>
                            <Text>Books Borrowed: {user.booksBorrowed}</Text>
                            <Text>Books Returned: {user.booksReturned}</Text>
                        </VStack>
                    </Box>
                ))}
            </SimpleGrid>
        </>
    );
};

export default Users;
