import React, { useState } from "react";
import {
    Box,
    Flex,
    Text,
    Image,
    Link,
    HStack,
    IconButton,
    Collapse,
    VStack,
    useColorMode,
    useColorModeValue,
    border,
} from "@chakra-ui/react";
import { CloseIcon, HamburgerIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import { color, m, motion } from "framer-motion";
import logo from "/src/assets/pngegg logo.png";
import user from "/src/assets/user.png";

const Header: React.FC = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    const [isOpen, setIsOpen] = useState(false);
    const handleToggle = () => setIsOpen(!isOpen);

    const bgColor = useColorModeValue("teal.500", "gray.600");
    const textColor = useColorModeValue("textColor.light", "textColor.dark");
    const linkBg = useColorModeValue("linkBg.light", "linkBg.dark");
    const linkHoverBg = useColorModeValue(
        "linkHoverBg.light",
        "linkHoverBg.dark"
    );
    const linkHoverColor = useColorModeValue(
        "linkHoverColor.light",
        "linkHoverColor.dark"
    );

    const linkStyles = {
        bg: linkBg,
        my: 2,
        p: 2,

        _hover: {
            borderRadius: "md",
            bg: linkHoverBg,
            color: linkHoverColor,
        },
    };

    const linkStylesC = {
        p: 2,
        color: "white",
        pr: "90%",
        borderBottom: "white solid 0.05px",
        borderRadius: "md",
        _hover: {
            color: "black",
            bg: linkHoverBg,
        },
    };

    const MotionFlex = motion(Flex);

    return (
        <Box position={"sticky"} top={0} zIndex={10}>
            <Text
                bg={bgColor}
                py={2}
                px={"10%"}
                fontSize={20}
                display={{ base: "flex", md: "none", sm: "none", lg: "none" }}
                color={"white"}
            >
                Library Management System
            </Text>
            <MotionFlex
                as="header"
                p={4}
                bg={bgColor}
                color={textColor}
                justify="space-between"
                align="center"
                initial={{ y: -250 }}
                animate={{ y: 0 }}
                transition={{ type: "spring", stiffness: 75 }}
                borderRadius="md"
                m={2}
            >
                <HStack>
                    <Image src={logo} boxSize="60px" borderRadius="5px" />
                    <Text
                        fontSize={{ base: 18, lg: 28, md: 25, sm: 20 }}
                        display={{
                            base: "none",
                            md: "flex",
                            sm: "flex",
                            lg: "flex",
                        }}
                    >
                        Library Management System
                    </Text>
                </HStack>

                <Flex align="center">
                    <Box
                        display={{
                            base: "flex",
                            lg: "none",
                            md: "none",
                            sm: "flex",
                        }}
                    >
                        <IconButton
                            aria-label="Toggle Theme"
                            bg={linkBg}
                            icon={
                                colorMode === "light" ? (
                                    <MoonIcon />
                                ) : (
                                    <SunIcon color={"white"} />
                                )
                            }
                            onClick={toggleColorMode}
                            colorScheme="teal"
                            mx={2}
                        />
                        <IconButton
                            aria-label="Toggle Navigation"
                            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                            onClick={handleToggle}
                            size="md"
                            bg={linkBg}
                            color={"white"}
                            _hover={{ bg: "teal.600" }}
                        />
                    </Box>
                    <HStack
                        spacing={4}
                        display={{
                            base: "none",
                            lg: "flex",
                            md: "flex",
                            sm: "none",
                        }}
                    >
                        <IconButton
                            aria-label="Toggle Theme"
                            bg={linkBg}
                            icon={
                                colorMode === "light" ? (
                                    <MoonIcon />
                                ) : (
                                    <SunIcon color={"white"} />
                                )
                            }
                            onClick={toggleColorMode}
                            colorScheme="teal"
                        />
                        <Link
                            href="/homepage"
                            sx={linkStyles}
                            borderRadius="md"
                        >
                            Home
                        </Link>
                        <Link href="/catalog" sx={linkStyles} borderRadius="md">
                            Catalog
                        </Link>
                        <Link
                            href="/account"
                            sx={linkStyles}
                            borderRadius="50px"
                        >
                            <Image src={user} boxSize="28px" />
                        </Link>
                    </HStack>
                </Flex>
            </MotionFlex>

            <Collapse in={isOpen}>
                <VStack
                    spacing={4}
                    align="start"
                    px={4}
                    pl={10}
                    mx={2}
                    bg={bgColor}
                    borderRadius="md"
                    py={2}
                >
                    <Link href="/homepage" sx={linkStylesC}>
                        Home
                    </Link>
                    <Link href="/catalog" sx={linkStylesC}>
                        Catalog
                    </Link>
                    <Link href="/account" sx={linkStylesC}>
                        Account
                    </Link>
                </VStack>
            </Collapse>
        </Box>
    );
};

export default Header;
