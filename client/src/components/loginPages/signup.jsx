import React, { useState } from "react";
import { Heading, Input, Button, VStack } from "@chakra-ui/react";
import Layout from "./layout";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post("http://localhost:5000/api/auth/signup", {
                username,
                email,
                password,
            });
            navigate("/homepage");
        } catch (error) {
            console.error("Error during sign up:", error);
        }
    };

    return (
        <Layout>
            <VStack
                spacing={6}
                p={8}
                bg="white"
                boxShadow="md"
                borderRadius="md"
                w="full"
                maxW="md"
            >
                <Heading>Sign Up</Heading>
                <form onSubmit={handleSubmit}>
                    <VStack spacing={4}>
                        <Input
                            placeholder="Username"
                            type="username"
                            value={username}
                            onChange={(event) =>
                                setUsername(event.target.value)
                            }
                            isRequired
                        />
                        <Input
                            placeholder="Email"
                            type="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            isRequired
                        />
                        <Input
                            placeholder="Password"
                            type="password"
                            value={password}
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                            isRequired
                        />
                        <Button type="submit" colorScheme="teal" width="full">
                            Sign UP
                        </Button>
                    </VStack>
                </form>
            </VStack>
        </Layout>
    );
};

export default SignUp;
