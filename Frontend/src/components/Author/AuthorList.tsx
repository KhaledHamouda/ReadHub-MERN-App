import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AuthorList.css";
import { Link } from "react-router-dom";

interface Author {
  _id: string;
  photo: string;
  authorFirstName: string;
  authorLastName: string;
}

const AuthorList: React.FC = () => {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [authorsPerPage] = useState(6);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAuthors = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get("http://localhost:3100/authors");
        setAuthors(response.data);
      } catch (error) {
        setError("Error fetching authors");
        console.error("Error fetching authors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthors();
  }, []);

  // Get current authors
  const indexOfLastAuthor = currentPage * authorsPerPage;
  const indexOfFirstAuthor = indexOfLastAuthor - authorsPerPage;
  const currentAuthors = authors.slice(indexOfFirstAuthor, indexOfLastAuthor);

  // Calculate total pages
  const totalPages = Math.ceil(authors.length / authorsPerPage);

  // Generate pagination buttons
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="author-list-container">
      <h2 className="author-list-title">Authors</h2>
      <div className="author-list">
        {loading ? (
          <p>Loading authors...</p>
        ) : error ? (
          <p>{error}</p>
        ) : currentAuthors.length > 0 ? (
          currentAuthors.map((author) => (
            <Link
              key={author._id}
              to={`/author/${author._id}`}
              className="author-item"
            >
              <div className="author-photo-wrapper">
                <img
                  src={author.authorPhoto}
                  alt={`${author.authorFirstName} ${author.authorLastName}`}
                  className="author-photo"
                />
              </div>
              <h3 className="author-name">{`${author.authorFirstName} ${author.authorLastName}`}</h3>
            </Link>
          ))
        ) : (
          <p>No authors available.</p>
        )}
      </div>

      <nav className="pagination-nav">
        <ul className="pagination">
          <li>
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="pagination-button"
            >
              Previous
            </button>
          </li>
          {[...Array(totalPages)].map((_, i) => (
            <li
              key={`page-${i + 1}`}
              className={`pagination-item ${
                currentPage === i + 1 ? "active" : ""
              }`}
            >
              <button
                onClick={() => paginate(i + 1)}
                className="pagination-button"
              >
                {i + 1}
              </button>
            </li>
          ))}
          <li>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="pagination-button"
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default AuthorList;
