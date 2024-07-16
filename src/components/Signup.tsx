import React, { useState } from "react";
import { Heading, Input, Button, VStack } from "@chakra-ui/react";
import Layout from "../components/layout";

const SignUp: React.FC = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // Handle sign-in logic here, such as API calls to authenticate the user
        console.log("Email:", email);
        console.log("Username:", username);
        console.log("Password:", password);
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
                            Sign In
                        </Button>
                    </VStack>
                </form>
            </VStack>
        </Layout>
    );
};

export default SignUp;
