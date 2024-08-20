import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './Redux/store'; // Adjust import path if necessary
import { AdminLogin } from './components/Admin/AdminLogin';
// import { AdminPanel } from './components/Admin/AdminPanel';
import AdminBooks from './components/Admin/AdminBooks';
import Home from './pages/Home';
import BookList from './components/Book/BookList';
import AuthorList from './components/Author/AuthorList';
import CategoryList from './components/Category/CategoryList';
import SignUp from './pages/SignUp';
import Login from './pages/Login';

function App() {
  const { authState } = useSelector((state: RootState) => state.DataReducer);
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return sessionStorage.getItem("admin") === "true";
  });

  const handleLoginSuccess = (admin: boolean) => {
    setIsAdmin(admin);
    sessionStorage.setItem("admin", String(admin));
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
        <Route path="/admin/books" element={<AdminBooks />} />
        {/* <Route path="/admin/*" element={isAdmin ? <AdminPanel /> : <Navigate to="/admin" />} /> */}
        {/* <Route path="/signup" element={<SignUp />} /> */}
        <Route path="/login" element={<Login />} />
        {authState === 'login' && <Route path="/login" element={<Login />} />}
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
