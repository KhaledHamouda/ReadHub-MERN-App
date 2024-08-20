import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./BookList.css";

// Define the types for book and error
interface Book {
  _id: string;
  title: string;
  photo: string;
}

const BookList: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [booksPerPage] = useState<number>(10);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get<Book[]>("http://localhost:3100/books");
        setBooks(response.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  const totalPages = Math.ceil(books.length / booksPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="book-list">
        {loading ? (
          <p>Loading books...</p>
        ) : error ? (
          <p>{error}</p>
        ) : currentBooks.length > 0 ? (
          currentBooks.map((book) => (
            <div key={book._id} className="book-item">
              <Link to={`/books/${book._id}`}>
                <h2>{book.title}</h2>
                <img src={book.photo} alt={book.title} />
              </Link>
            </div>
          ))
        ) : (
          <p>No books available.</p>
        )}
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
  );
};

export default BookList;
