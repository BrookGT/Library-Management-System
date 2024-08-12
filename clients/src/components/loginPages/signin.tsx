import React, { useState, FormEvent } from "react";
import { Heading, Input, Button, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Layout from "./layout";

const SignIn: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const navigate = useNavigate();

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        navigate("/homePage");
    };

    return (
        <Layout>
            <VStack
                spacing={6}
                p={8}
                borderRadius="md"
                color="black"
                border="1px solid #4179FF"
                bg="rgba(255, 255, 255, 0.9)"
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
            </VStack>
        </Layout>
    );
};

export default SignIn;
