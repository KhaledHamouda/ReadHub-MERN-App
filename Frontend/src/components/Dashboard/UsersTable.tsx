import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { jwtDecode } from "jwt-decode";
import axiosInstance from "../../axios";
import { FaStar } from "react-icons/fa";

interface Book {
  _id: string;
  title: string;
  photo: string;
}

interface UserBook {
  _id: string;
  bookId: Book;
  state: string;
  rating?: number;
  review?: string;
}

interface Error {
  message: string;
}

interface DecodedToken {
  id: string;
}

const UsersTable: React.FC = () => {
  const [userBooks, setUserBooks] = useState<UserBook[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchUserBooks = async () => {
      try {
        const token = sessionStorage.getItem("userToken");

        if (!token) {
          throw new Error("No token found");
        }

        const decodedToken = jwtDecode<DecodedToken>(token);
        const userId = decodedToken.id;

        const response = await axiosInstance.get(`/userbook/${userId}/books`);

        setUserBooks(response.data);
      } catch (err: any) {
        setError({ message: err.message });
      } finally {
        setLoading(false);
      }
    };

    fetchUserBooks();
  }, []);

  const handleRatingChange = async (bookId: string, newRating: number) => {
    const token = sessionStorage.getItem("userToken");

    if (!token) {
      alert("Please log in to rate this book.");
      return;
    }

    let userId: string | null = null;

    try {
      const decoded: DecodedToken = jwtDecode(token);
      userId = decoded.id;
    } catch (error) {
      console.error("Error decoding token:", error);
    }

    if (!userId) {
      alert("Unable to determine user ID.");
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

      setUserBooks((prevBooks) =>
        prevBooks.map((userBook) =>
          userBook.bookId && userBook.bookId._id === bookId
            ? { ...userBook, rating: newRating }
            : userBook
        )
      );

      alert("Rating submitted successfully!");
    } catch (error) {
      console.error("Failed to update rating", error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Cover</TableCell>
            <TableCell>Book Title</TableCell>
            <TableCell>State</TableCell>
            <TableCell>Rating</TableCell>
            <TableCell>Review</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userBooks.map((userBook) => (
            <TableRow key={userBook._id}>
              <TableCell>
                {userBook.bookId ? (
                  <img
                    src={userBook.bookId.photo}
                    alt={userBook.bookId.title}
                    style={{ width: "100px", height: "auto" }}
                  />
                ) : (
                  "No cover"
                )}
              </TableCell>
              <TableCell>
                {userBook.bookId ? userBook.bookId.title : "No Title"}
              </TableCell>
              <TableCell>{userBook.state}</TableCell>
              <TableCell>
                {userBook.bookId &&
                  [1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      className={`star ${
                        star <= (userBook.rating || 0) ? "filled" : ""
                      }`}
                      onClick={() =>
                        handleRatingChange(userBook.bookId!._id, star)
                      }
                    />
                  ))}
              </TableCell>
              <TableCell>{userBook.review || "N/A"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UsersTable;
