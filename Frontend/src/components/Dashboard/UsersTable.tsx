import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { jwtDecode } from 'jwt-decode';
import axiosInstance from '../../axios';
import { string } from 'zod';
import axios from 'axios';

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
    const [stateData, setStateData] = useState({
        userId: '',
        bookId: '',
        state: ''
    });
    const [token, setToken] = useState<string>('') 

    useEffect(() => {
        fetchUserBooks();
    }, []);

    const fetchUserBooks = async () => {
        try {
            const token = sessionStorage.getItem('userToken');

            if (!token) {
                throw new Error('No token found');
            }

            const decodedToken = jwtDecode<DecodedToken>(token);
            const userId = decodedToken.id;
            setToken(userId)

            const response = await axiosInstance.get(`/userbook/${userId}/books`);
            
            
            setUserBooks(response.data);
           
        } catch (err: any) {
            setError({ message: err.message });
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    const filteredBooks = filterState === 'All' ? userBooks : userBooks.filter(book => book.state === filterState);

    const handleChangeState = async (e: React.ChangeEvent<HTMLSelectElement>, userId: string, book: Book) => {
        const { value } = e.target;

        console.log(value)
        console.log(userId)
        console.log(book._id)
    
        // Directly use the values in the API call
        try {
            const response = await axios.post('http://localhost:3100/userbook/state', {
                userId: userId,
                bookId: book._id,
                state: value
            });
            
            if (response.data) {
                fetchUserBooks(); // Refresh the data
            } else {
                alert('Error Changing State!');
            }
        } catch (err) {
            console.error('Error: ' + err);
        }
    };

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
                    {filteredBooks.map((userBook) => (
                        <TableRow key={userBook._id}>
                            <TableCell>
                                {userBook.bookId ? (
                                    <img src={userBook.bookId.photo} alt={userBook.bookId.title} style={{ width: '100px', height: 'auto' }} />
                                ) : 'No cover'}
                            </TableCell>
                            <TableCell>{userBook.bookId ? userBook.bookId.title : 'No Title'}</TableCell>
                            <TableCell>

                                <select name='state' className="form-select form-select-sm" aria-label="Small select example" style={{width: 160}}
                                onChange={(e) => {handleChangeState(e, token, userBook.bookId)}}>
                                    <option defaultValue={userBook.state} disabled value={userBook.state}>{userBook.state}</option>
                                    <option value="Want to Read">Want to Read</option>
                                    <option value="Currently Reading">Currently Reading</option>
                                    <option value="Read">Read</option>
                                </select>

                            </TableCell>
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
