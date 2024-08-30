import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { AdminLogin } from "./components/Admin/AdminLogin";
import AdminBooks from "./components/Admin/AdminBooks";
import AdminCategory from "./components/Admin/adminCategory";
import AdminAuthor from "./components/Admin/adminAuthor";
import Home from "./pages/Home";

import BookList from "./components/Book/BookList";
import AuthorList from "./components/Author/AuthorList";
import CategoryList from "./components/Category/CategoryList";
import Dashboard from "./pages/Dashboard";
import LoginForm from "./pages/Login";
import SignUp from "./pages/SignUp";
import BookDetail from "./components/Book/BookDetail";
import CategoryDetail from "./components/Category/CategoryDetail";
import AuthorDetail from "./components/Author/AuthorDetail";


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/admin"element={<AdminLogin />} />

        <Route path="/books" element={<BookList />} />
        <Route path="/book/:id" element={<BookDetail />} />
        <Route path="/authors" element={<AuthorList />} />
        <Route path="/categories" element={<CategoryList />} />
        <Route path="/admin/books" element={<AdminBooks />} />
        <Route path="/admin/categories" element={<AdminCategory />} />
        <Route path="/admin/authors" element={<AdminAuthor />} />
        <Route path="/author/:id" element={<AuthorDetail />} />
        <Route path="/category/:id" element={<CategoryDetail />} />
        <Route path="/author/:id" element={<AuthorDetail />} />
        <Route path="/category/:id" element={<CategoryDetail />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* <Route
          path="/admin/*"
          element={isAdmin ? <AdminPanel /> : <Navigate to="/admin" />}
          /> */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
