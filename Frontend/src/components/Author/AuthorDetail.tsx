import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { FaStar } from "react-icons/fa";
import "./AuthorDetail.css";
import Navbar from "../homeComponents/Navbar";
import { Link } from "react-router-dom";
import axiosInstance from "../../axios";

interface DecodedToken {
  id: string;
  admin: boolean;
}

interface Author {
  authorFirstName: string;
  authorLastName: string;
  authorPhoto: string;
  authorDateOfBirth: string;
}

interface Book {
  _id: string;
  title: string;
  photo: string;
  state?: string;
  userRating?: number;
  averageRating?: number;
  ratingCount?: number;
}

const AuthorDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [author, setAuthor] = useState<Author | null>(null);
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const token = sessionStorage.getItem("userToken");
  let userId: string | null = null;

  if (token) {
    try {
      const decoded: DecodedToken = jwtDecode(token);
      userId = decoded.id;
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  }

  useEffect(() => {
    const fetchAuthorDetails = async () => {
      try {
        const response = await axiosInstance.get<Author>(
          `/authors/${id}`
        );
        setAuthor(response.data);

        const booksResponse = await axiosInstance.get<Book[]>(
          `/authors/${id}/books`
        );
        const booksData = booksResponse.data;

        if (userId) {
          const booksWithState = await Promise.all(
            booksData.map(async (book) => {
              try {
                const userBookResponse = await axiosInstance.get(
                  `/userbook/${userId}/books?bookId=${book._id}`,
                  { headers: { Authorization: `Bearer ${token}` } }
                );
                return {
                  ...book,
                  state: userBookResponse.data?.state || "Want to Read",
                  userRating: userBookResponse.data?.rating || 0,
                };
              } catch (error) {
                console.error(
                  `Error fetching state for book ${book._id}`,
                  error
                );
                return { ...book };
              }
            })
          );
          setBooks(booksWithState);
        } else {
          setBooks(booksData);
        }
      } catch (error) {
        setError("Failed to fetch author details or books.");
        console.error("Error fetching author or books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthorDetails();
  }, [id, userId, token]);

  const handleStateChange = async (bookId: string, newState: string) => {
    if (!token || !userId) {
      alert("Please log in to change your book state.");
      return;
    }

    try {
      await axiosInstance.post(
        `/userbook/state`,
        {
          userId,
          bookId,
          state: newState,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book._id === bookId ? { ...book, state: newState } : book
        )
      );
      alert("State updated successfully!");
    } catch (error) {
      console.error("Failed to update book state", error);
    }
  };

  const handleRatingChange = async (bookId: string, newRating: number) => {
    if (!token || !userId) {
      alert("Please log in to rate this book.");
      return;
    }

    try {
      await axiosInstance.post(
        `/userbook/rating`,
        {
          userId,
          bookId,
          rating: newRating,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      await axiosInstance.post(
        `/userbook/state`,
        {
          userId,
          bookId,
          state: "Read",
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const booksResponse = await axiosInstance.get<Book[]>(
        `/authors/${id}/books`
      );
      const updatedBooks = booksResponse.data;

      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book._id === bookId
            ? {
                ...book,
                userRating: newRating,
                averageRating:
                  updatedBooks.find((b) => b._id === bookId)?.averageRating ||
                  book.averageRating,
                ratingCount:
                  updatedBooks.find((b) => b._id === bookId)?.ratingCount ||
                  book.ratingCount,
                state: "Read",
              }
            : book
        )
      );

      alert("Rating submitted successfully and book state updated to 'Read'!");
    } catch (error) {
      console.error("Failed to update rating", error);
    }
  };

  if (loading) {
    return <p>Loading author details...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!author) {
    return <p>Author not found.</p>;
  }

  return (
    <div>
      <Navbar />
      <div className="author-detail">
        <div className="author-header">
          <img
            src={author.authorPhoto}
            alt={`${author.authorFirstName} ${author.authorLastName}`}
            className="author-photo"
          />
          <div className="author-info">
            <h1>
              {author.authorFirstName} {author.authorLastName}
            </h1>
            <p>
              <strong>Date of Birth:</strong>{" "}
              {new Date(author.authorDateOfBirth).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="author-books-section">
          <h2>
            Books by {author.authorFirstName} {author.authorLastName}
          </h2>
          {books.length > 0 ? (
            books.map((book) => {
              const averageRating = Number(book.averageRating) || 0;
              return (
                <div key={book._id} className="book">
                  {/* Wrap the image with Link */}
                  <Link to={`/book/${book._id}`}>
                    <img
                      src={book.photo}
                      alt={book.title}
                      className="book-photo"
                    />
                  </Link>
                  <div className="book-info">
                    {/* Wrap the title with Link */}
                    <Link to={`/book/${book._id}`}>
                      <h3>{book.title}</h3>
                    </Link>

                    <div className="book-state-rating">
                      <div className="book-state">
                        <strong>State:</strong>
                        <select
                          value={book.state || "Want to Read"}
                          onChange={(e) =>
                            handleStateChange(book._id, e.target.value)
                          }
                        >
                          <option value="Want to Read">Want to Read</option>
                          <option value="Currently Reading">
                            Currently Reading
                          </option>
                          <option value="Read">Read</option>
                        </select>
                      </div>

                      <div className="book-rating">
                        <strong>Your Rating:</strong>
                        {[1, 2, 3, 4, 5].map((star) => (
                          <FaStar
                            key={star}
                            className={`star ${
                              star <= (book.userRating || 0) ? "filled" : ""
                            }`}
                            onClick={() => handleRatingChange(book._id, star)}
                          />
                        ))}
                      </div>

                      <div className="average-rating">
                        <strong>Average Rating:</strong>
                        {averageRating > 0 ? (
                          <>
                            {[...Array(Math.round(averageRating))].map(
                              (_, i) => (
                                <FaStar key={i} />
                              )
                            )}
                            <span>
                              {" "}
                              ({averageRating.toFixed(1)} out of{" "}
                              {book.ratingCount} ratings)
                            </span>
                          </>
                        ) : (
                          <span>No ratings yet</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p>No books found for this author.</p>
          )}
        </div>
      </div>
    </div>
  );
};
export default AuthorDetail;
