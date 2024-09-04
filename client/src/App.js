import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BookList from "./components/bookList/BookList";
import BookForm from "./components/bookForm/BookForm";
import "./app.scss";

function App() {
  return (
    <div className="app">
      <Router>
        <nav>
          <a href="/">Home</a>
          <a href="/add">Add Book</a>
        </nav>
        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/add" element={<BookForm />} />
          <Route path="/edit/:id" element={<BookForm />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
