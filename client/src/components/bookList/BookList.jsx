import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Edit, Delete } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import "./bookList.scss";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState({ title: "", author: "" });
  const navigate = useNavigate();

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:8800/books")
  //     .then((res) => setBooks(res.data))
  //     .catch((err) => console.log(err));
  // }, []);

  useEffect(() => {
    fetchBooks();
  }, [search]);

  const fetchBooks = () => {
    const query = new URLSearchParams(search).toString();
    axios
      .get(`http://localhost:8800/books?${query}`)
      .then((res) => setBooks(res.data))
      .catch((err) => console.log(err));
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      axios
        .delete(`http://localhost:8800/books/${id}`)
        .then(() => setBooks(books.filter((book) => book._id !== id)))
        .catch((err) => console.log(err));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearch((prevSearch) => ({ ...prevSearch, [name]: value }));
  };

  return (
    <div className="book-list">
      <h1>Book List</h1>
      <form className="search-form">
        <input
          type="text"
          name="title"
          placeholder="Search by title"
          value={search.title}
          onChange={handleChange}
        />
        <input
          type="text"
          name="author"
          placeholder="Search by author"
          value={search.author}
          onChange={handleChange}
        />
      </form>
      <ul>
        {books.map((book) => (
          <li key={book._id}>
            <div className="book-info">
              <span className="book-title">Title: {book.title}</span>
              <span className="book-author">Author: {book.author}</span>
              <span className="book-genre">Genre: {book.genre}</span>
              <span className="book-date">
                Published: {new Date(book.publishedDate).toLocaleDateString()}
              </span>
            </div>
            <div className="icons">
              <IconButton
                aria-label="edit"
                onClick={() => handleEdit(book._id)}
                className="edit-icon"
              >
                <Edit />
              </IconButton>
              <IconButton
                aria-label="delete"
                onClick={() => handleDelete(book._id)}
                className="delete-icon"
              >
                <Delete />
              </IconButton>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
