import { useState, useEffect, ChangeEvent } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "./BookDetail.css";
import { FaStar } from "react-icons/fa";
import Navbar from "../homeComponents/Navbar";

interface DecodedToken {
  id: string;
  admin: boolean;
}

interface Book {
  title: string;
  photo: string;
  authorName: string;
  categoryName: string;
  description: string;
  authorId: any;
  categoryId: any;
}

interface Review {
  _id: string;
  userId: {
    firstName: string;
    lastName: string;
  };
  rating: number;
  review: string;
  createdAt: string;
}

const BookDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [userBook, setUserBook] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [rating, setRating] = useState<number>(0);
  const [review, setReview] = useState<string>("");
  const [reviewSubmitted, setReviewSubmitted] = useState<boolean>(false);
  const [reviewError, setReviewError] = useState<string | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState<boolean>(true);
  // const [reviewsError, setReviewsError] = useState<string | null>(null);
  const [averageRating, setAverageRating] = useState<number>(0);
  const [ratingCount, setRatingCount] = useState<number>(0);

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
    const fetchBookDetails = async () => {
      try {
        const bookResponse = await axios.get(
          `http://localhost:3100/books/${id}`
        );
        setBook(bookResponse.data);

        if (userId) {
          try {
            const userBookResponse = await axios.get(
              `http://localhost:3100/userbook/${userId}/books?bookId=${id}`,
              { headers: { Authorization: `Bearer ${token}` } }
            );
            setUserBook(userBookResponse.data);
            setRating(userBookResponse.data?.rating || 0);
            setReview(userBookResponse.data?.review || "");
          } catch (userBookError) {
            console.error("Error fetching user book data:", userBookError);
          }
        }
      } catch (error) {
        setError("Error fetching book details");
        console.error("Error fetching book details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id, token, userId]);
  useEffect(() => {
    const fetchReviews = () => {
      axios
        .get(`http://localhost:3100/userbook/reviews/${id}`)
        .then((response) => {
          const reviewsData = response.data;
          setReviews(reviewsData);

          const totalRating = reviewsData.reduce(
            (sum: number, review: Review) => sum + review.rating,
            0
          );
          const avgRating =
            reviewsData.length > 0 ? totalRating / reviewsData.length : 0;

          setAverageRating(avgRating);
          setRatingCount(reviewsData.length);
        })
        .catch(() => {
          setReviews([]);
        })
        .finally(() => {
          setReviewsLoading(false);
        });
    };

    fetchReviews();
  }, [id]);

  const handleStateChange = async (newState: string) => {
    if (!token || !userId) {
      alert("Please log in to change your book state.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3100/userbook/state",
        {
          userId,
          bookId: id,
          state: newState,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUserBook(response.data.userBook);
    } catch (error) {
      console.error("Failed to update book state", error);
    }
  };

  const handleReviewChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setReview(event.target.value);
    setReviewError(null);
  };
  const handleReviewSubmit = async () => {
    if (!token || !userId) {
      setReviewError("Please log in to submit a review.");
      return;
    }

    if (review.trim() === "") {
      setReviewError("Review cannot be empty.");
      return;
    }

    try {
      await axios.post(
        "http://localhost:3100/userbook/review",
        {
          userId,
          bookId: id,
          review,
          rating,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setReviewSubmitted(true);
      setUserBook((prev: any) => ({
        ...prev,
        review,
        rating,
      }));
      setReview("");

      const reviewsResponse = await axios.get(
        `http://localhost:3100/userbook/reviews/${id}`
      );
      setReviews(reviewsResponse.data);

      const totalRating = reviewsResponse.data.reduce(
        (sum: number, review: Review) => sum + review.rating,
        0
      );
      const avgRating =
        reviewsResponse.data.length > 0
          ? totalRating / reviewsResponse.data.length
          : 0;
      setAverageRating(avgRating);
      setRatingCount(reviewsResponse.data.length);
    } catch (error) {
      console.error("Failed to submit review", error);
      setReviewError("Failed to submit review. Please try again.");
    }
  };
  const handleRatingChange = async (newRating: number) => {
    if (!token || !userId) {
      alert("Please log in to rate this book.");
      return;
    }

    try {
      await axios.post(
        "http://localhost:3100/userbook/rating",
        {
          userId,
          bookId: id,
          rating: newRating,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setRating(newRating);
      setUserBook((prev: any) => ({ ...prev, rating: newRating }));
      alert("Rating submitted successfully!");

      const reviewsResponse = await axios.get(
        `http://localhost:3100/userbook/reviews/${id}`
      );
      const reviewsData = reviewsResponse.data;

      const totalRating = reviewsData.reduce(
        (sum: number, review: Review) => sum + review.rating,
        0
      );
      const avgRating =
        reviewsData.length > 0 ? totalRating / reviewsData.length : 0;
      setAverageRating(avgRating);
      setRatingCount(reviewsData.length);

      setReviews(reviewsData);
    } catch (error) {
      console.error("Failed to update rating", error);
    }
  };

  if (loading) {
    return <p>Loading book details...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!book) {
    return <p>Book not found.</p>;
  }
  return (
    <div>
      <Navbar />
      <div className="book-detail">
        <img src={book.photo} alt={book.title} />
        <div className="book-detail-content">
          <h1>{book.title}</h1>
          <p>
            <strong>Author: </strong>
            {book.authorId
              ? `${book.authorId.authorFirstName || ""} ${
                  book.authorId.authorLastName || ""
                }`.trim()
              : "No author available"}
          </p>
          <p>
            <strong>Category:</strong> {book.categoryId?.categoryName}
          </p>

          <div>
            <strong>Average Rating:</strong>
            {averageRating > 0 ? (
              <>
                {[...Array(Math.round(averageRating))].map((_, i) => (
                  <FaStar key={i} />
                ))}
                <span>
                  {" "}
                  ({averageRating.toFixed(1)} out of {ratingCount} ratings)
                </span>
              </>
            ) : (
              <span>No ratings yet</span>
            )}
          </div>
          <div className="user-book-info">
            <div>
              <strong>State:</strong>
              <select
                value={userBook?.state || "Want to Read"}
                onChange={(e) => handleStateChange(e.target.value)}
              >
                <option value="Want to Read">Want to Read</option>
                <option value="Currently Reading">Currently Reading</option>
                <option value="Read">Read</option>
              </select>
            </div>

            <div>
              <strong>Review:</strong>
              <textarea value={review} onChange={handleReviewChange} />
              <button className="submit-button" onClick={handleReviewSubmit}>
                Submit Review
              </button>
              {reviewError && <p className="error-message">{reviewError}</p>}
              {reviewSubmitted && (
                <p className="success-message">
                  Review submitted successfully!
                </p>
              )}
            </div>

            <div>
              <strong>Rating:</strong>
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  className={`star ${star <= rating ? "filled" : ""}`}
                  onClick={() => handleRatingChange(star)}
                />
              ))}
            </div>
          </div>
          <div className="reviews-section">
            <h2>Reviews</h2>
            {reviewsLoading ? (
              <p>Loading reviews...</p>
            ) : reviews.length > 0 ? (
              reviews.map((review) => (
                <div key={review._id} className="review">
                  <div className="review-header">
                    <strong>
                      {review.userId.firstName} {review.userId.lastName}
                    </strong>
                    <span className="review-rating">
                      rated this book {review.rating} out of 5
                    </span>
                  </div>
                  <p className="review-content">{review.review}</p>
                  <p className="review-date">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))
            ) : (
              <p>No reviews yet. Be the first to review this book!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
