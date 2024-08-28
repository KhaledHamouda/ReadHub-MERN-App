import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import "./CategoryDetail.css";
import Navbar from "../homeComponents/Navbar";
import { createTheme, ThemeProvider} from '@mui/material';
import { useSelector } from "react-redux";


interface Author {
  authorFirstName: string;
  authorLastName: string;
}

interface Book {
  _id: string;
  title: string;
  photo: string;
  authorId: Author;
}

interface Category {
  categoryName: string;
  books: Book[];
}

const CategoryDetail = () => {
  const { mode } = useSelector((state: any) => state.DataReducer);
  const { id } = useParams<{ id: string }>();
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [booksPerPage] = useState<number>(5);

  useEffect(() => {
    const fetchCategoryDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3100/categories/${id}`
        );
        setCategory(response.data);
      } catch (error) {
        setError("Error fetching category details");
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryDetails();
  }, [id]);

  const theme = createTheme({
    palette: {
        mode: mode || 'light',
        background: {
            default: mode === 'light' ? '#fff' : '#121212',
            paper: mode === 'light' ? '#fff' : '#1e1e1e', 
        },
    },
});

  if (loading) {
    return <p>Loading category details...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!category) {
    return <p>Category not found.</p>;
  }

  // Pagination Logic
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = category.books.slice(indexOfFirstBook, indexOfLastBook);

  const totalPages = Math.ceil(category.books.length / booksPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <ThemeProvider theme={theme}>

    <div>
      <Navbar />
      <div className="category-detail">
        <h1>{category.categoryName}</h1>
        <div className="books-list">
          {currentBooks.map((book) => (
            <div key={book._id} className="book-item">
              <Link to={`/book/${book._id}`}>
                <img src={book.photo} alt={book.title} className="book-photo" />
                <h3>{book.title}</h3>
                <p>
                  {`${book.authorId.authorFirstName} ${book.authorId.authorLastName}`}
                </p>
              </Link>
            </div>
          ))}
        </div>

        <nav>
          <ul className="pagination">
            <li>
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
            </li>
            {pageNumbers.map((page) => (
              <li
                key={`page-${page}`}
                className={currentPage === page ? "active" : ""}
              >
                <button onClick={() => paginate(page)}>{page}</button>
              </li>
            ))}
            <li>
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
    </ThemeProvider>
  );
};

export default CategoryDetail;
