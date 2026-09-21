import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import BookList from "./pages/BookList";
import AddBook from "./pages/AddBook";
import BookDetails from "./pages/BookDetails";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Routes>
      <Route path="/" element={<Login onLogin={() => setIsLoggedIn(true)} />} />
      <Route
        path="/books"
        element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <Home />
          </ProtectedRoute>
        }
      >
        <Route index element={<BookList />} />
        <Route path="add" element={<AddBook />} />
        <Route path=":id" element={<BookDetails />} />
      </Route>
    </Routes>
  );
}
