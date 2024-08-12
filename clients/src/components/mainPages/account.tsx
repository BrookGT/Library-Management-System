import React, { useState } from "react";
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
} from "@chakra-ui/react";
import { CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";
import Header from "./header";
import { useNavigate } from "react-router-dom";

interface User {
    username: string;
    email: string;
    borrowed: number;
    returned: number;
}

const InitialUser: User = {
    username: "BirukGT",
    email: "Bura@example.com",
    borrowed: 3,
    returned: 2,
};

const MotionBox = motion(Box);

const Account: React.FC = () => {
    const [user, setUser] = useState<User>(InitialUser);
    const [showEditForm, setShowEditForm] = useState(false);
    const [newAcc, setNewAcc] = useState<User>({
        username: "",
        email: "",
        borrowed: 0,
        returned: 0,
    });

    const handleEditAcc = () => {
        if (newAcc.username && newAcc.email) {
            setUser(newAcc);
            setNewAcc({
                username: "",
                email: "",
                borrowed: 0,
                returned: 0,
            });
            setShowEditForm(false);
        }
    };
    const bgColor = useColorModeValue("gray.100", "gray.800");
    const acCol = useColorModeValue("gray.500", "gray.600");
    const aciCol = useColorModeValue("gray.300", "gray.400");
    const buttonCol = useColorModeValue("teal.400", "teal.500");

    const navigate = useNavigate();

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
                                        value={newAcc.username}
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
                                        value={newAcc.email}
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
                                {user.borrowed}
                            </Text>
                        </HStack>
                        <HStack>
                            <Text>Returned books: </Text>
                            <Text fontWeight="bold" fontSize="lg">
                                {user.returned}
                            </Text>
                        </HStack>
                    </VStack>
                </MotionBox>
                <Button
                    mt={4}
                    ml="80%"
                    bg={buttonCol}
                    _hover={{ bg: "teal.900" }}
                    onClick={() => {
                        navigate("/");
                    }}
                >
                    Logout
                </Button>
            </MotionBox>
        </Box>
    );
};

export default Account;
