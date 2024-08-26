import React, { useState, useEffect } from "react";
import {
    Box,
    Heading,
    Text,
    HStack,
    VStack,
    Divider,
    Button,
    FormControl,
    FormLabel,
    Input,
    useColorModeValue,
    useToast,
} from "@chakra-ui/react";
import { CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";
import Header from "./header";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface User {
    id: number;
    username: string;
    email: string;
}

interface UserActivity {
    booksBorrowedCount: number;
    booksReturnedCount: number;
}

const MotionBox = motion(Box);

const Account: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [userActivity, setUserActivity] = useState<UserActivity | null>(null);
    const [showEditForm, setShowEditForm] = useState(false);
    const [newAcc, setNewAcc] = useState<Partial<User>>({
        username: "",
        email: "",
    });

    const toast = useToast();
    const navigate = useNavigate();
    const bgColor = useColorModeValue("gray.100", "gray.800");
    const acCol = useColorModeValue("gray.500", "gray.600");
    const aciCol = useColorModeValue("gray.300", "gray.400");
    const buttonCol = useColorModeValue("teal.400", "teal.500");

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem("userToken");
                const response = await axios.get(
                    "http://localhost:5000/api/account",
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                setUser(response.data.user);
                setUserActivity(response.data.activity);
            } catch (error) {
                console.error("Failed to fetch user data:", error);
            }
        };

        fetchUser();
    }, []);

    const handleEditAcc = async () => {
        if (newAcc.username && newAcc.email) {
            try {
                const token = localStorage.getItem("userToken");
                await axios.put(
                    "http://localhost:5000/api/account",
                    { username: newAcc.username, email: newAcc.email },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setUser(
                    (prevUser) =>
                        ({
                            ...prevUser,
                            username: newAcc.username!,
                            email: newAcc.email!,
                        } as User)
                );

                toast({
                    title: "Account updated.",
                    description:
                        "Your account details have been updated successfully.",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                });

                setNewAcc({});
                setShowEditForm(false);
            } catch (error) {
                console.error("Failed to update user data:", error);
                toast({
                    title: "Account updated.",
                    description:
                        "Your account details have been updated successfully.",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                });
            }
        }
    };

    const handleLogOut = () => {
        localStorage.removeItem("userToken");
        navigate("/signin");
    };

    if (!user || !userActivity) {
        return <Text>Loading...</Text>;
    }

    return (
        <Box bg={bgColor} minHeight="100vh">
            <Header />

            <MotionBox
                p={6}
                m={{ base: 5, sm: 20 }}
                mx={{ md: "15%", lg: "15%" }}
                bg={acCol}
                borderRadius="lg"
                boxShadow="lg"
                position="relative"
                color={"black"}
            >
                {showEditForm && (
                    <Box
                        position="absolute"
                        top="0"
                        left="0"
                        right="0"
                        bottom="0"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        bg="rgba(0, 0, 0, 0.5)"
                        zIndex="1"
                    >
                        <Box
                            p={4}
                            boxShadow="lg"
                            borderRadius="md"
                            zIndex="2"
                            bg="rgba(255, 255, 255, 0.9)"
                        >
                            <VStack spacing={4}>
                                <FormControl>
                                    <Button
                                        ml="80%"
                                        size={"md"}
                                        bg={"gray.300"}
                                        _hover={{ bg: "gray.500" }}
                                        onClick={() => {
                                            setShowEditForm(!showEditForm);
                                        }}
                                    >
                                        <CloseIcon color={"red.700"} />
                                    </Button>

                                    <FormLabel>Username:</FormLabel>
                                    <Input
                                        border={"black solid 1px"}
                                        _hover={{ border: "black solid 2px" }}
                                        value={newAcc.username || ""}
                                        onChange={(e) =>
                                            setNewAcc({
                                                ...newAcc,
                                                username: e.target.value,
                                            })
                                        }
                                    />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Email:</FormLabel>
                                    <Input
                                        border={"black solid 1px"}
                                        _hover={{ border: "black solid 2px" }}
                                        value={newAcc.email || ""}
                                        onChange={(e) =>
                                            setNewAcc({
                                                ...newAcc,
                                                email: e.target.value,
                                            })
                                        }
                                    />
                                </FormControl>
                                <Button
                                    bg={buttonCol}
                                    _hover={{ bg: "teal.600" }}
                                    onClick={handleEditAcc}
                                >
                                    <CheckIcon />
                                </Button>
                            </VStack>
                        </Box>
                    </Box>
                )}
                <Heading color={"white"}>My Account</Heading>

                <Divider my={4} />

                <MotionBox
                    p={4}
                    borderRadius="md"
                    bg={aciCol}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <VStack spacing={2}>
                        <HStack>
                            <Text>Username: </Text>
                            <Text fontWeight="bold" fontSize="lg">
                                {user.username}
                            </Text>
                        </HStack>
                        <HStack>
                            <Text>Email: </Text>
                            <Text fontWeight="bold" fontSize="md">
                                {user.email}
                            </Text>
                        </HStack>

                        <Button
                            mt={2}
                            size="md"
                            bg={buttonCol}
                            _hover={{ bg: "teal.700" }}
                            onClick={() => {
                                setShowEditForm(!showEditForm);
                            }}
                        >
                            <EditIcon mr={2} />
                            Edit account
                        </Button>

                        <Divider color="black" my={4} />
                        <HStack>
                            <Text>Borrowed books: </Text>
                            <Text fontWeight="bold" fontSize="lg">
                                {userActivity.booksBorrowedCount}
                            </Text>
                        </HStack>
                        <HStack>
                            <Text>Returned books: </Text>
                            <Text fontWeight="bold" fontSize="lg">
                                {userActivity.booksReturnedCount}
                            </Text>
                        </HStack>
                    </VStack>
                </MotionBox>
                <Button
                    mt={4}
                    ml="80%"
                    bg={buttonCol}
                    _hover={{ bg: "teal.900" }}
                    onClick={handleLogOut}
                >
                    Logout
                </Button>
            </MotionBox>
        </Box>
    );
};

export default Account;
