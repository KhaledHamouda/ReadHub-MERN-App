    import React, { useEffect, useState } from 'react';
    import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
    import {jwtDecode } from 'jwt-decode';
    import axiosInstance from '../../axios';

    interface Book {
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
            const token = sessionStorage.getItem('userToken');

            if (!token) {
            throw new Error('No token found');
            }

            console.log(`token ${token}`);
            const decodedToken = jwtDecode<DecodedToken>(token);
            const userId = decodedToken.id;
            console.log(`userID ${userId}`);

            // Fetch user books using the user ID
            // const response = await axiosInstance.get(`/userbook/66bbf2a4cf1531046658843b/books`);
            const response = await axiosInstance.get(`/userbook/${userId}/books`);
            
            console.log(response.data);
            setUserBooks(response.data);
        } catch (err: any) {
            setError({ message: err.message });
        } finally {
            setLoading(false);
        }
        };

        fetchUserBooks();
    }, []);

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
                    <img src={userBook.bookId.photo} alt={userBook.bookId.title} style={{ width: '100px', height: 'auto' }} />
                    ) : 'No cover'}
                </TableCell>
                <TableCell>{userBook.bookId ? userBook.bookId.title : 'No Title'}</TableCell>
                <TableCell>{userBook.state}</TableCell>
                <TableCell>{userBook.rating !== undefined ? userBook.rating : 'N/A'}</TableCell>
                <TableCell>{userBook.review || 'N/A'}</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    );
    };

    export default UsersTable;
