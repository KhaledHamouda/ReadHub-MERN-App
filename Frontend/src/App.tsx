import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AdminLogin } from './components/Admin/LoginAdmin';
import { AdminPanel } from './components/Admin/AdminPanal';
import Home from './pages/Home';
import "./App.css";
import BookList from "./components/Book/BookList";
import AuthorList from "./components/Author/AuthorList";

function App() {
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return sessionStorage.getItem("admin") === "true";
  });

  const handleLoginSuccess = (admin: boolean, token: string) => {
    setIsAdmin(admin);
    window.location.href = "/admin/category";
  };

  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminLogin onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/admin/category" element={isAdmin ? <AdminPanel /> : <Navigate to="/admin/login" />} />
        <Route
          path="/admin"
          element={<AdminLogin onLoginSuccess={handleLoginSuccess} />}
        />
        <Route
          path="/admin/category"
          element={isAdmin ? <AdminPanel /> : <Navigate to="/admin/login" />}
        />
        <Route path="/books" element={<BookList />} />
        <Route path="/authors" element={<AuthorList />} />
      </Routes>
    </Router>
  );
}

export default App;
