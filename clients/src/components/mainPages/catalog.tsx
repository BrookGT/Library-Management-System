import React, { useState } from "react";
import {
    Box,
    Text,
    Image,
    Link,
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
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import Header from "./header";

const MotionBox = motion(Box);

interface Book {
    id: number;
    title: string;
    author: string;
    description: string;
    image: string;
}

const books: Book[] = [
    {
        id: 1,
        title: "Small Factoring Business",
        author: "Jeff Calender",
        description: "This is a description of Book Title 1.",
        image: "/src/assets/SmallFactoringBusiness by Jeff.png",
    },
    {
        id: 2,
        title: "The Purpose Driven Life",
        author: "Rick Warren",
        description: "This is a description of Book Title 2.",
        image: "/src/assets/106049.webp",
    },
    {
        id: 3,
        title: "Cracking the Coding Interview",
        author: "Gayle Laakman Mcdowell",
        description: "This is a description of Book Title 2.",
        image: "/src/assets/cracking the coding interview.png",
    },
    {
        id: 4,
        title: "The Paragmatic Programmer",
        author: "Andrew Hunt and David Thomas",
        description: "This is a description of Book Title 2.",
        image: "/src/assets/the paragmatic programmer.jpg",
    },
    {
        id: 5,
        title: "Life of the Candle",
        author: "Patrick M. Burkhardt",
        description: "This is a description of Book Title 2.",
        image: "/src/assets/1016368_OJK9410.jpg",
    },
];

const Catalog: React.FC = () => {
    const { isOpen: isModalOpen, onOpen, onClose } = useDisclosure();
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);

    // State for borrowed and returned books count
    const [borrowedBooksCount, setBorrowedBooksCount] = useState(0);
    const [returnedBooksCount, setReturnedBooksCount] = useState(0);

    const handleBookClick = (book: Book) => {
        setSelectedBook(book);
        onOpen();
    };

    const handleBorrow = () => {
        setBorrowedBooksCount(borrowedBooksCount + 1);
        onClose();
    };

    const handleReturn = () => {
        setBorrowedBooksCount(borrowedBooksCount - 1);
        setReturnedBooksCount(returnedBooksCount + 1);
        onClose();
    };

    const bgColor = useColorModeValue("gray.100", "gray.800");
    const footerCol = useColorModeValue("teal.500", "gray.600");

    return (
        <Box bg={bgColor} pt={0.1}>
            <Header />

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
                                src={book.image}
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

            {selectedBook && (
                <Modal isOpen={isModalOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>{selectedBook.title}</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Image
                                src={selectedBook.image}
                                alt={selectedBook.title}
                                borderRadius="md"
                            />
                            <Text mt={4}>{selectedBook.description}</Text>
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                colorScheme="teal"
                                mr={3}
                                onClick={handleBorrow}
                            >
                                Borrow
                            </Button>
                            <Button
                                border="solid 1px "
                                variant="ghost"
                                onClick={handleReturn}
                            >
                                Return
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            )}

            <Box
                as="footer"
                p={6}
                bg={footerCol}
                color="white"
                textAlign="center"
            >
                <Text>
                    Inbox us for book recommendation:
                    <Link p={2} href="mailto:email@library.com">
                        email@library.com
                    </Link>
                </Text>
            </Box>
        </Box>
    );
};

export default Catalog;
