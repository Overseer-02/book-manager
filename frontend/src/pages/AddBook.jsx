import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddBook() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim() || !author.trim() || !genre.trim()) {
      setError("All fields are required.");
      return;
    }

    setError("");
    setSaving(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/api/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ title, author, genre }),
      });
      if (!res.ok) throw new Error("Request failed");

      navigate("/books");
    } catch {
      setError("Failed to save the book. Please try again.");
      setSaving(false);
    }
  }

  return (
    <div>
      <h2>Add Book</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Book Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <input
          placeholder="Genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />
        {error && <p className="error">{error}</p>}
        <button type="submit" disabled={saving}>
          {saving ? "Saving..." : "Save Book"}
        </button>
      </form>
    </div>
  );
}
