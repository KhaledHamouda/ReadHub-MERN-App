import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AdminLogin } from './components/Admin/AdminLogin';
import { AdminPanel } from './components/Admin/AdminPanal';
import   AdminBooks from './components/Admin/AdminBooks';

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

        <Route path="/admin" element={<AdminLogin onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/admin/books" element={<AdminBooks/>} />
        <Route path="/admin/*" element={isAdmin ? <AdminPanel /> : <Navigate to="/admin" />} />

      </Routes>
    </Router> 
  );

}

export default App;
