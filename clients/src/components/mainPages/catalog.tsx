import React, { useState, useEffect } from "react";
import {
    Box,
    Text,
    Image,
    SimpleGrid,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Button,
    useColorModeValue,
    Alert,
    AlertIcon,
    Input,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import Header from "./header";
import axios from "axios";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

const MotionBox = motion(Box);

interface Book {
    id: number;
    title: string;
    author: string;
    description: string;
    image_url: string;
}

const Catalog: React.FC = () => {
    const { isOpen: isModalOpen, onOpen, onClose } = useDisclosure();
    const [books, setBooks] = useState<Book[]>([]);
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");

    const handleBookClick = (book: Book) => {
        setSelectedBook(book);
        onOpen();
    };

    const handleBorrow = async () => {
        if (selectedBook) {
            const token = localStorage.getItem("userToken");

            if (token) {
                try {
                    const response = await axios.post(
                        "http://localhost:5000/api/borrow",
                        { bookId: selectedBook.id },
                        { headers: { Authorization: `Bearer ${token}` } }
                    );

                    if (response.data.error) {
                        setError(response.data.error);
                        setSuccess(null);
                    } else {
                        setSuccess("You borrowed this book!");
                        setError(null);
                    }

                    setTimeout(() => {
                        setSuccess(null);
                        setError(null);
                    }, 2000);
                } catch (error) {
                    if (axios.isAxiosError(error)) {
                        setError(
                            error.response?.data?.error ||
                                "Failed to borrow book. Please try again."
                        );
                        setSuccess(null);
                    } else {
                        console.error("Unexpected error:", error);
                        setError(
                            "An unexpected error occurred. Please try again."
                        );
                        setSuccess(null);
                    }

                    setTimeout(() => setError(null), 2000);
                }
            } else {
                setError("No token found. Please sign in.");
                setSuccess(null);
                setTimeout(() => setError(null), 2000);
            }
        }
    };

    const handleReturn = async () => {
        if (selectedBook) {
            const token = localStorage.getItem("userToken");

            if (token) {
                try {
                    const response = await axios.post(
                        "http://localhost:5000/api/return",
                        { bookId: selectedBook.id },
                        { headers: { Authorization: `Bearer ${token}` } }
                    );

                    if (response.data.error) {
                        setError(response.data.error);
                        setSuccess(null);
                    } else {
                        setSuccess("You returned this book!");
                        setError(null);
                    }

                    setTimeout(() => {
                        setSuccess(null);
                        setError(null);
                    }, 2000);
                } catch (error) {
                    if (axios.isAxiosError(error)) {
                        setError(
                            error.response?.data?.error ||
                                "Failed to return book. Please try again."
                        );
                        setSuccess(null);
                        setTimeout(() => setError(null), 2000);
                    } else {
                        console.error("Unexpected error:", error);
                        setError(
                            "An unexpected error occurred. Please try again."
                        );
                        setSuccess(null);
                        setTimeout(() => setError(null), 2000);
                    }
                }
            } else {
                setError("User ID not found.");
                setSuccess(null);
                setTimeout(() => setError(null), 2000);
            }
        }
    };

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:5000/api/books",
                    {
                        params: {
                            page: currentPage,
                            limit: 8,
                            search: searchTerm,
                        },
                    }
                );
                setBooks(response.data.books);
                setTotalPages(response.data.totalPages);
            } catch (error) {
                console.error("Failed to fetch books:", error);
            }
        };

        fetchBooks();
    }, [currentPage, searchTerm]);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1);
    };

    const bgColor = useColorModeValue("gray.100", "gray.800");
    const footerCol = useColorModeValue("teal.500", "gray.600");

    return (
        <>
            <Box bg={bgColor} pt={0.1}>
                <Header />
                <Box
                    m={4}
                    mx="auto"
                    width={"50%"}
                    border="solid 1px"
                    borderRadius={4}
                >
                    <Input
                        variant="outlined"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        placeholder="Search by title or author"
                    />
                </Box>
                <Box color={"black"}>
                    <SimpleGrid
                        columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
                        spacing={4}
                    >
                        {books.map((book) => (
                            <MotionBox
                                key={book.id}
                                as={motion.div}
                                whileHover={{ scale: 1.05 }}
                                onClick={() => handleBookClick(book)}
                                cursor="pointer"
                                boxShadow="md"
                                p={4}
                                m={2}
                                borderRadius="md"
                                bg="white"
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                            >
                                <Image
                                    src={book.image_url}
                                    alt={book.title}
                                    borderRadius="md"
                                />
                                <Text mt={2} fontWeight="bold">
                                    {book.title}
                                </Text>
                                <Text>{book.author}</Text>
                            </MotionBox>
                        ))}
                    </SimpleGrid>
                </Box>

                <Box display="flex" justifyContent="center" m={4}>
                    <Button
                        onClick={() =>
                            setCurrentPage((prev) => Math.max(prev - 1, 1))
                        }
                        isDisabled={currentPage === 1}
                        leftIcon={<ChevronLeftIcon />}
                        mr={2}
                    >
                        Previous
                    </Button>
                    <Text alignSelf="center">
                        Page {currentPage} of {totalPages}
                    </Text>
                    <Button
                        onClick={() =>
                            setCurrentPage((prev) =>
                                Math.min(prev + 1, totalPages)
                            )
                        }
                        isDisabled={currentPage === totalPages}
                        rightIcon={<ChevronRightIcon />}
                        ml={2}
                    >
                        Next
                    </Button>
                </Box>

                {selectedBook && (
                    <Modal isOpen={isModalOpen} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>{selectedBook.title}</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <Image
                                    src={selectedBook.image_url}
                                    alt={selectedBook.title}
                                    borderRadius="md"
                                />
                                <Text mt={4}>{selectedBook.description}</Text>
                            </ModalBody>
                            {success && (
                                <Alert status="success">
                                    <AlertIcon />
                                    {success}
                                </Alert>
                            )}
                            {error && (
                                <Alert status="error">
                                    <AlertIcon />
                                    {error}
                                </Alert>
                            )}
                            <ModalFooter>
                                <Button
                                    colorScheme="teal"
                                    mr={3}
                                    onClick={handleBorrow}
                                >
                                    Borrow
                                </Button>
                                <Button
                                    border="solid 1px"
                                    variant="ghost"
                                    onClick={handleReturn}
                                >
                                    Return
                                </Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                )}
            </Box>
            <Box
                as="footer"
                p={6}
                bg={footerCol}
                color="gray.100"
                textAlign="center"
            >
                &copy; 2023 LibTrack. All rights reserved.
            </Box>
        </>
    );
};

export default Catalog;
