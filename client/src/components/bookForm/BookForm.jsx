import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./bookForm.scss";

const BookForm = () => {
  const [book, setBook] = useState({
    title: "",
    author: "",
    publishedDate: "",
    genre: "",
  });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:8800/books/${id}`)
        .then((res) => {
          const isoDate = res.data.publishedDate;
          const formattedDate = isoDate.split("T")[0];
          const uodatedObj = {
            ...res.data,
            publishedDate: formattedDate,
          };
          setBook(uodatedObj);
        })
        .catch((err) => console.log(err));
    }
  }, [id]);

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const request = id
      ? axios.put(`http://localhost:8800/books/${id}`, book)
      : axios.post("http://localhost:8800/books", book);

    request.then(() => navigate("/")).catch((err) => console.log(err));
  };

  return (
    <div className="book-form">
      <h2>{id ? "Edit Book" : "Add Book"}</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={book.title}
          onChange={handleChange}
        />

        <label htmlFor="author">Author</label>
        <input
          type="text"
          id="author"
          name="author"
          value={book.author}
          onChange={handleChange}
        />

        <label htmlFor="publishedDate">Published Date</label>
        <input
          type="date"
          id="publishedDate"
          name="publishedDate"
          value={book.publishedDate}
          onChange={handleChange}
        />

        <label htmlFor="genre">Genre</label>
        <input
          type="text"
          id="genre"
          name="genre"
          value={book.genre}
          onChange={handleChange}
        />

        <button type="submit">{id ? "Update Book" : "Add Book"}</button>
      </form>
    </div>
  );
};

export default BookForm;
