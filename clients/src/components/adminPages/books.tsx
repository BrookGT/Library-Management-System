import React, { useMemo, useState, useEffect } from "react";
import {
    Typography,
    Grid,
    Box,
    Card,
    CardContent,
    CardMedia,
    useMediaQuery,
    createTheme,
    ThemeProvider,
    CssBaseline,
    TextField,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";
import axios from "axios";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import Header from "./AdminHeader";

interface Book {
    id: number;
    title: string;
    author: string;
    description: string;
    image_url: string;
}

const Books: React.FC = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [newBook, setNewBook] = useState<Book>({
        id: 0,
        title: "",
        author: "",
        description: "",
        image_url: "",
    });
    const [openAddFormDialog, setOpenAddFormDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [selectedBookId, setSelectedBookId] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const booksPerPage = 6;

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:5000/api/books",
                    {
                        params: {
                            page: currentPage,
                            limit: booksPerPage,
                        },
                    }
                );
                setBooks(response.data.books);
                setTotalPages(response.data.totalPages);
            } catch (error) {
                console.error("Error fetching books:", error);
                setError("Failed to fetch books.");
            }
        };

        fetchBooks();
    }, [currentPage]);

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handleOpenDeleteDialog = (id: number) => {
        setSelectedBookId(id);
        setOpenDeleteDialog(true);
    };

    const handleCloseDeleteDialog = () => {
        setOpenDeleteDialog(false);
        setSelectedBookId(null);
    };

    const handleConfirmRemoveBook = async () => {
        if (selectedBookId !== null) {
            try {
                await axios.delete(
                    `http://localhost:5000/api/books/${selectedBookId}`
                );
                setBooks(books.filter((book) => book.id !== selectedBookId));
                handleCloseDeleteDialog();
            } catch (error) {
                console.error("Error deleting book:", error);
                setError("Failed to delete the book.");
            }
        }
    };

    const handleOpenAddFormDialog = () => {
        setOpenAddFormDialog(true);
    };

    const handleCloseAddFormDialog = () => {
        setOpenAddFormDialog(false);
        setNewBook({
            id: 0,
            title: "",
            author: "",
            description: "",
            image_url: "",
        });
        setError(null);
    };

    const handleAddBook = async () => {
        if (
            newBook.title &&
            newBook.author &&
            newBook.description &&
            newBook.image_url
        ) {
            try {
                const response = await axios.post(
                    "http://localhost:5000/api/books",
                    newBook
                );
                setBooks([...books, response.data]);
                handleCloseAddFormDialog();
            } catch (error) {
                console.error("Error adding book:", error);
                setError("Failed to add the book.");
            }
        } else {
            setError("All fields are required.");
        }
    };

    const [darkMode, setDarkMode] = useState(false);
    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode: darkMode ? "dark" : "light",
                },
            }),
        [darkMode]
    );
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const isMidScreen = useMediaQuery(theme.breakpoints.down("md"));

    const handleToggleTheme = () => {
        setDarkMode((prevMode) => !prevMode);
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Header darkMode={darkMode} handleToggleTheme={handleToggleTheme} />

            <Grid container style={{ minHeight: "100vh" }}>
                <Box
                    textAlign="center"
                    mt={10}
                    pb={1}
                    ml="40%"
                    borderBottom={1}
                >
                    <Typography variant="h4">List of Books</Typography>
                </Box>
                <Grid
                    item
                    xs={12}
                    sm={isMidScreen ? 12 : 9}
                    style={{
                        padding: "20px",
                        marginLeft: isSmallScreen || isMidScreen ? 0 : "25%",
                        marginBottom: "1rem",
                        width: isSmallScreen || isMidScreen ? "100%" : "75%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Box
                        style={{
                            backgroundColor: "white",
                            padding: "20px",
                            borderRadius: "8px",
                            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                            background: "lightgray",
                        }}
                    >
                        <Grid container spacing={4} justifyContent="center">
                            {books.map((book) => (
                                <Grid
                                    item
                                    key={book.id}
                                    xs={12}
                                    sm={6}
                                    md={4}
                                    lg={3}
                                >
                                    <Card style={{ height: "100%" }}>
                                        <CardMedia
                                            component="img"
                                            height="250"
                                            image={book.image_url}
                                            alt={book.title}
                                            onError={(e) => {
                                                (
                                                    e.target as HTMLImageElement
                                                ).src = "/default-image.png"; // Fallback image path
                                            }}
                                        />
                                        <CardContent style={{ flexGrow: 1 }}>
                                            <Typography variant="h6">
                                                {book.title}
                                            </Typography>
                                            <Typography variant="subtitle1">
                                                {book.author}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="textSecondary"
                                            >
                                                {book.description}
                                            </Typography>
                                            <Button
                                                variant="contained"
                                                color="error"
                                                onClick={() =>
                                                    handleOpenDeleteDialog(
                                                        book.id
                                                    )
                                                }
                                                style={{ marginTop: "10px" }}
                                            >
                                                <DeleteIcon />
                                                Remove
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                        <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            mt={4}
                        >
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handlePreviousPage}
                                disabled={currentPage === 1}
                                style={{ marginRight: "10px" }}
                            >
                                Previous
                            </Button>
                            <Typography variant="body1">
                                Page {currentPage} of {totalPages}
                            </Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleNextPage}
                                disabled={currentPage === totalPages}
                                style={{ marginLeft: "10px" }}
                            >
                                Next
                            </Button>
                        </Box>
                    </Box>

                    <Box
                        position="fixed"
                        bottom={16}
                        right={16}
                        padding={2}
                        bgcolor={"rgba(255, 255, 255, 0.5)"}
                        borderRadius={1}
                    >
                        <Button
                            size="large"
                            variant="contained"
                            onClick={handleOpenAddFormDialog}
                            style={{
                                background: "teal",
                            }}
                        >
                            <AddIcon />
                        </Button>
                    </Box>
                </Grid>
            </Grid>

            <Dialog
                open={openDeleteDialog}
                onClose={handleCloseDeleteDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Are you sure you want to delete this book?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Deleting this book cannot be undone. Do you want to
                        proceed?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDeleteDialog} color="primary">
                        Cancel
                    </Button>
                    <Button
                        onClick={handleConfirmRemoveBook}
                        color="primary"
                        autoFocus
                    >
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={openAddFormDialog}
                onClose={handleCloseAddFormDialog}
                aria-labelledby="form-dialog-title"
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle id="form-dialog-title">Add New Book</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2} padding={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Image URL"
                                value={newBook.image_url}
                                onChange={(e) =>
                                    setNewBook({
                                        ...newBook,
                                        image_url: e.target.value,
                                    })
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Book Title"
                                value={newBook.title}
                                onChange={(e) =>
                                    setNewBook({
                                        ...newBook,
                                        title: e.target.value,
                                    })
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Author Name"
                                value={newBook.author}
                                onChange={(e) =>
                                    setNewBook({
                                        ...newBook,
                                        author: e.target.value,
                                    })
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Description"
                                value={newBook.description}
                                onChange={(e) =>
                                    setNewBook({
                                        ...newBook,
                                        description: e.target.value,
                                    })
                                }
                            />
                        </Grid>
                        {error && (
                            <Grid item xs={12}>
                                <Typography
                                    variant="body2"
                                    color="error"
                                    align="center"
                                >
                                    {error}
                                </Typography>
                            </Grid>
                        )}
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleCloseAddFormDialog}
                        style={{ color: "red" }}
                    >
                        Cancel
                    </Button>
                    <Button onClick={handleAddBook} style={{ color: "green" }}>
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </ThemeProvider>
    );
};

export default Books;
