import React, { useState } from "react";
import { Heading, Input, Button, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Layout from "./layout";

const SignIn: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // Handle sign-in logic here, such as API calls to authenticate the user
        navigate("/homepage");
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
                <Heading>Sign In</Heading>
                <form onSubmit={handleSubmit}>
                    <VStack spacing={4}>
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

export default SignIn;
