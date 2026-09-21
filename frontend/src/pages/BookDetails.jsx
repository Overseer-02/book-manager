import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/books/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Request failed");
        return res.json();
      })
      .then((data) => setBook(data))
      .catch(() => setError("Failed to load this book."))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <div>
      <button onClick={() => navigate("/books")}>Back</button>
      <h2>Book Details</h2>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      {book && (
        <div className="book-card">
          <p>
            <strong>Title:</strong> {book.title}
          </p>

          <p>
            <strong>Author:</strong> {book.author}
          </p>
          <p>
            <strong>Genre:</strong> {book.genre}
          </p>
        </div>
      )}
    </div>
  );
}
