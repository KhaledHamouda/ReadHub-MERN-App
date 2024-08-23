import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import axiosInstance from '../../axios';
import { string } from 'zod';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
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

interface UsersTableProps {
    filterState: string;
}

const UsersTable: React.FC<UsersTableProps> = ({ filterState }) => {
    const [userBooks, setUserBooks] = useState<UserBook[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);
   console.log(`filterState is ${filterState}`)

    useEffect(() => {
        fetchUserBooks();
    }, []);

    const fetchUserBooks = async () => {
        try {
            const token = sessionStorage.getItem('userToken');
     
            if (!token) {
                throw new Error('No token found');
            }
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

  const handleStateChange = async (bookId: string, newState: string) => {
    const token = sessionStorage.getItem("userToken");

    if (!token) {
      alert("Please log in to change your book state.");
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
        `/userbook/state`,
        {
          userId,
          bookId,
          state: newState,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setUserBooks((prevBooks) =>
        prevBooks.map((userBook) =>
          userBook.bookId && userBook.bookId._id === bookId
            ? { ...userBook, state: newState }
            : userBook
        )
      );
      
    } catch (error) {
      console.error("Failed to update book state", error);
    }
  };

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

    //console.log(filterState)
    const filteredBooks = filterState === 'All' ? userBooks : userBooks.filter(book => book.state === filterState);
    // console.log(filteredBooks)

    
  if (loading) return <div>Loading: {loading}</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
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
            {filteredBooks.map((userBook) => (
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
                <TableCell>
                  <select
                    value={userBook.state}
                    onChange={(e) =>
                      handleStateChange(userBook.bookId._id, e.target.value)
                    }>
                    <option value="Want to Read">Want to Read</option>
                    <option value="Currently Reading">Currently Reading</option>
                    <option value="Read">Read</option>
                  </select>
                </TableCell>
                <TableCell>
                  {userBook.bookId &&
                    [1, 2, 3, 4, 5].map((star) => (
                      <FaStar
                        key={star}
                        className={`star ${
                          star <= (userBook.rating || 0) ? "filled" : ""
                        }`}
                        onClick={() =>
                          handleRatingChange(userBook.bookId._id, star)
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
    </>
  );
};

export default UsersTable;