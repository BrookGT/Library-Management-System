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

const Catalog = () => {
    return (
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
                <Link p={2} href="./homepage">
                    Home
                </Link>
                <Link
                    p={2}
                    href="./catalog"
                    borderRadius="md"
                    bg="rgba(255, 255, 255, 0.6)"
                    color="black"
                >
                    Catalog
                </Link>
                <Link p={2} href="./account">
                    Account
                </Link>
            </Flex>
        </Flex>
    );
};

export default Catalog;
