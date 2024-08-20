import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AdminLogin } from './components/Admin/AdminLogin';
import { AdminPanel } from './components/Admin/AdminPanal';
import AdminBooks from './components/Admin/AdminBooks';
import Home from './pages/Home';
import BookList from "./components/Book/BookList";
import AuthorList from "./components/Author/AuthorList";
import CategoryList from "./components/Category/CategoryList";

function App() {
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return sessionStorage.getItem("admin") === "true";
  });

  const handleLoginSuccess = (admin: boolean, token: string) => {
    setIsAdmin(admin);
    window.location.href = '/admin/categories';
  };

  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Home />} />

        <Route path="/admin" element={<AdminLogin onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/books" element={<BookList />} />
        <Route path="/authors" element={<AuthorList />} />
        <Route path="/categories" element={<CategoryList />} />
        <Route path="/admin/books" element={<AdminBooks/>} />
        <Route path="/admin/*" element={isAdmin ? <AdminPanel /> : <Navigate to="/admin" />} />

      </Routes>
    </Router>
  );

}

export default App;
