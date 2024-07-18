import logo from "/src/assets/logo.png";
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

const Users = () => {
    return (
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
                    <Text>Admin Dashboard</Text>
                </HStack>
            </Heading>
            <Flex px="5%">
                <Link p={2} href="./admin-dashboard">
                    Home
                </Link>
                <Link p={2} href="./users">
                    Users
                </Link>
            </Flex>
        </Flex>
    );
};

export default Users;
