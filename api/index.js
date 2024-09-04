const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const Book = require("./models/bookModel");

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());

// MongoDB connection
mongoose
  .connect("mongodb://127.0.0.1/bookDB")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

app.post("/books", async (req, res) => {
  try {
    const newBook = new Book(req.body);
    await newBook.save();
    res.json(newBook);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// app.get("/books", async (req, res) => {
//   const books = await Book.find();
//   res.json(books);
// });

app.get("/books", async (req, res) => {
  try {
    const { title, author } = req.query;
    const query = {};

    if (title) {
      query.title = { $regex: title, $options: "i" }; // Case-insensitive search for title
    }

    if (author) {
      query.author = { $regex: author, $options: "i" }; // Case-insensitive search for author
    }

    const books = await Book.find(query);
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/books/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.put("/books/:id", async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json(updatedBook);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.delete("/books/:id", async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json({ message: "Book deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/books/search", async (req, res) => {
  try {
    const { title, author } = req.query;
    const books = await Book.find({
      $or: [
        { title: { $regex: title, $options: "i" } },
        { author: { $regex: author, $options: "i" } },
      ],
    });
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(8800, () => {
  console.log("Server running on port 8800");
});
