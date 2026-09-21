import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function BookList() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/books")
      .then((res) => {
        if (!res.ok) throw new Error("Request failed");
        return res.json();
      })
      .then((data) => setBooks(data))
      .catch(() => setError("Failed to load books."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h2>My Books</h2>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && books.length === 0 && <p>No books yet.</p>}

      {books.map((book) => (
        <div
          key={book.id}
          className="book-card"
          onClick={() => navigate(`/books/${book.id}`)}
        >
          <h3>{book.title}</h3>
          <p>{book.author}</p>
        </div>
      ))}

      <button className="fab" onClick={() => navigate("/books/add")}>
        +
      </button>
    </div>
  );
}
