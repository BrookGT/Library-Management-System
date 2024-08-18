import React, { useState, FormEvent } from "react";
import {
    Heading,
    Input,
    Button,
    VStack,
    Alert,
    AlertIcon,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Layout from "./layout";
import axios from "axios";

const AdminLogin: React.FC = () => {
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const response = await axios.post(
                "http://localhost:5000/api/adminlogin",
                {
                    username,
                    email,
                    password,
                }
            );

            if (response.status === 200) {
                const { token } = response.data; // Assuming the token is returned in the response

                if (token) {
                    localStorage.setItem("adminToken", token);
                    console.log("Admin token set in local storage:", token);
                }

                setSuccess("Admin sign-in successful!");
                setError(null);

                setTimeout(() => {
                    navigate("/adminDashboard");
                }, 1000); // Show success message for 1 second before redirecting
            } else {
                console.log("Unexpected response status:", response.status);
                setError("Sign-in failed. Please try again.");
                setSuccess(null);
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 400) {
                setError("Invalid credentials");
            } else {
                setError("Sign-in failed. Please try again.");
            }
            setSuccess(null);
        }
    };

    return (
        <Layout>
            <VStack
                spacing={6}
                p={8}
                color={"black"}
                borderRadius="md"
                border="1px solid #4179FF"
                bg="rgba(255, 255, 255, 0.9)"
            >
                <Heading>Admin Sign In</Heading>
                <form onSubmit={handleSubmit}>
                    <VStack spacing={4}>
                        <Input
                            placeholder="Username"
                            type="text"
                            value={username}
                            onChange={(event) =>
                                setUsername(event.target.value)
                            }
                            isRequired
                            borderColor="gray.500"
                            _placeholder={{ color: "gray.600" }}
                        />
                        <Input
                            placeholder="Email"
                            type="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            isRequired
                            borderColor="gray.500"
                            _placeholder={{ color: "gray.600" }}
                        />
                        <Input
                            placeholder="Password"
                            type="password"
                            value={password}
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                            isRequired
                            borderColor="gray.500"
                            _placeholder={{ color: "gray.600" }}
                        />
                        <Button
                            type="submit"
                            bg="teal.500"
                            width="full"
                            _hover={{ bg: "teal.600" }}
                        >
                            Sign In
                        </Button>
                    </VStack>
                </form>
                {error && (
                    <Alert status="error">
                        <AlertIcon />
                        {error}
                    </Alert>
                )}
                {success && (
                    <Alert status="success">
                        <AlertIcon />
                        {success}
                    </Alert>
                )}
            </VStack>
        </Layout>
    );
};

export default AdminLogin;
