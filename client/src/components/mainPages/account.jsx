import logo from "/src/assets/logo.png";
import {
    Box,
    Flex,
    Heading,
    Text,
    Image,
    Link,
    Grid,
    GridItem,
    HStack,
    Center,
} from "@chakra-ui/react";

const Account = () => {
    // Example user data
    const user = {
        name: "BirukGT",
        email: "BrookGT@example.com",
        borrowed: 4,
        returned: 5,
    };

    return (
        <>
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
                    <Link p={2} href="/homepage">
                        Home
                    </Link>
                    <Link p={2} href="/catalog">
                        Catalog
                    </Link>
                    <Link
                        p={2}
                        href="/account"
                        borderRadius="md"
                        bg="rgba(255, 255, 255, 0.6)"
                        color="black"
                    >
                        Account
                    </Link>
                </Flex>
            </Flex>

            <Box p={6} mx="15%" my={10} bg="#7FA39C" borderRadius="lg">
                <Box
                    textAlign="center"
                    mb={6}
                    p={4}
                    borderRadius="md"
                    bg="#FFEBE2"
                >
                    <Heading as="h2" size="lg" mb={2}>
                        {user.name}
                    </Heading>
                    <Text fontSize={20}>Email: {user.email}</Text>
                </Box>

                <Box
                    textAlign="center"
                    mb={6}
                    p={4}
                    borderRadius="md"
                    bg="#94DCDE"
                >
                    <Text fontSize={20}>Borrowed Books: {user.borrowed}</Text>
                    <Text fontSize={20}>Returned Books: {user.returned}</Text>
                </Box>
            </Box>
        </>
    );
};

export default Account;
