import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./AuthorList.css";
import Navbar from "../homeComponents/Navbar";

interface Author {
  _id: string;
  photo: string;
  authorFirstName: string;
  authorLastName: string;
  authorPhoto: any;
}

const AuthorList: React.FC = () => {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [authorsPerPage] = useState<number>(6);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAuthors = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get<Author[]>(
          "http://localhost:3100/authors"
        );
        setAuthors(response.data);
      } catch (error) {
        console.error("Error fetching authors:", error);
        setError("Error fetching authors");
      } finally {
        setLoading(false);
      }
    };

    fetchAuthors();
  }, []);

  const indexOfLastAuthor = currentPage * authorsPerPage;
  const indexOfFirstAuthor = indexOfLastAuthor - authorsPerPage;
  const currentAuthors = authors.slice(indexOfFirstAuthor, indexOfLastAuthor);

  const totalPages = Math.ceil(authors.length / authorsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div>
      <Navbar />
      <div className="author-list">
        <h1>Author List</h1>
        <div className="author-items">
          {loading ? (
            <p>Loading authors...</p>
          ) : error ? (
            <p>{error}</p>
          ) : currentAuthors.length > 0 ? (
            currentAuthors.map((author) => (
              <div key={author._id} className="author-item">
                <Link to={`/author/${author._id}`}>
                  <img
                    src={author.photo}
                    alt={`${author.authorFirstName} ${author.authorLastName}`}
                  />
                  <h2>{`${author.authorFirstName} ${author.authorLastName}`}</h2>
                </Link>
              </div>
            ))
          ) : (
            <p>No authors available.</p>
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
    </div>
  );
};

export default AuthorList;
