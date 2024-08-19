
// AdminPanel.tsx
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Container, Row, Col, Button, Form, FormGroup, Label, Input, Table } from 'reactstrap';
import axiosInstance from '../../axios';
interface Category {
  _id: string;
  categoryName: string;
}

interface Author {
  _id: string;
  authorFirstName: string;
  authorLastName: string;
  authorDateOfBirth?: string;
}

interface Book {
  _id: string;
  title: string;
  photo?: string;
  categoryId: string;
  authorId: string;
}

export const AdminPanel: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [books, setBooks] = useState<Book[]>([]);

  // State for holding input values
  const [categoryName, setCategoryName] = useState<string>('');
  const [authorFirstName, setAuthorFirstName] = useState<string>('');
  const [authorLastName, setAuthorLastName] = useState<string>('');
  const [authorDateOfBirth, setAuthorDateOfBirth] = useState<string>('');
  const [bookTitle, setBookTitle] = useState<string>('');
  const [bookAuthorId, setBookAuthorId] = useState<string>('');
  const [bookCategoryId, setBookCategoryId] = useState<string>('');
  const [bookPhoto, setBookPhoto] = useState<string>('');

  // Fetch data from backend API
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [categoriesResponse, authorsResponse, booksResponse] = await Promise.all([
        axiosInstance.get('/categories'),
        axiosInstance.get('/authors'),
        axiosInstance.get('/books'),
      ]);

      setCategories(categoriesResponse.data);
      setAuthors(authorsResponse.data);
      setBooks(booksResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleAddCategory = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axiosInstance.post('/categories', { categoryName });
      setCategories([...categories, response.data]);
      setCategoryName('');
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  const handleAddAuthor = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axiosInstance.post('/authors', {
        authorFirstName,
        authorLastName,
        authorDateOfBirth,
      });
      setAuthors([...authors, response.data]);
      setAuthorFirstName('');
      setAuthorLastName('');
      setAuthorDateOfBirth('');
    } catch (error) {
      console.error('Error adding author:', error);
    }
  };

  const handleAddBook = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axiosInstance.post('/books', {
        title: bookTitle,
        photo: bookPhoto,
        authorId: bookAuthorId,
        categoryId: bookCategoryId,
      });
      setBooks([...books, response.data]);
      setBookTitle('');
      setBookPhoto('');
      setBookAuthorId('');
      setBookCategoryId('');
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  const handleUpdateCategory = async (id: string, name: string) => {
    try {
      const response = await axiosInstance.put(`/categories/${id}`, { categoryName: name });
      setCategories(categories.map(category => category._id === id ? response.data : category));
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };

  const handleUpdateAuthor = async (id: string, firstName: string, lastName: string, dob?: string) => {
    try {
      const response = await axiosInstance.put(`/authors/${id}`, {
        authorFirstName: firstName,
        authorLastName: lastName,
        authorDateOfBirth: dob,
      });
      setAuthors(authors.map(author => author._id === id ? response.data : author));
    } catch (error) {
      console.error('Error updating author:', error);
    }
  };

  const handleUpdateBook = async (id: string, title: string, authorId: string, categoryId: string, photo?: string) => {
    try {
      const response = await axiosInstance.put(`/books/${id}`, {
        title,
        photo,
        authorId,
        categoryId,
      });
      setBooks(books.map(book => book._id === id ? response.data : book));
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  const handleDeleteCategory = async (id: string) => {
    try {
      await axiosInstance.delete(`/categories/${id}`);
      setCategories(categories.filter(category => category._id !== id));
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const handleDeleteAuthor = async (id: string) => {
    try {
      await axiosInstance.delete(`/authors/${id}`);
      setAuthors(authors.filter(author => author._id !== id));
    } catch (error) {
      console.error('Error deleting author:', error);
    }
  };

  const handleDeleteBook = async (id: string) => {
    try {
      await axiosInstance.delete(`/books/${id}`);
      setBooks(books.filter(book => book._id !== id));
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  return (
    <Container>
      <h1>Admin Panel</h1>
      
      <Row>
        <Col>
          <h2>Add Category</h2>
          <Form onSubmit={handleAddCategory}>
            <FormGroup>
              <Label for="categoryName">Category Name</Label>
              <Input
                type="text"
                name="categoryName"
                id="categoryName"
                value={categoryName}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setCategoryName(e.target.value)}
              />
            </FormGroup>
            <Button type="submit" color="primary">Add Category</Button>
          </Form>
        </Col>
        
        <Col>
          <h2>Add Author</h2>
          <Form onSubmit={handleAddAuthor}>
            <FormGroup>
              <Label for="authorFirstName">First Name</Label>
              <Input
                type="text"
                name="authorFirstName"
                id="authorFirstName"
                value={authorFirstName}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setAuthorFirstName(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="authorLastName">Last Name</Label>
              <Input
                type="text"
                name="authorLastName"
                id="authorLastName"
                value={authorLastName}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setAuthorLastName(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="authorDateOfBirth">Date of Birth</Label>
              <Input
                type="date"
                name="authorDateOfBirth"
                id="authorDateOfBirth"
                value={authorDateOfBirth}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setAuthorDateOfBirth(e.target.value)}
              />
            </FormGroup>
            <Button type="submit" color="primary">Add Author</Button>
          </Form>
        </Col>
        
        <Col>
          <h2>Add Book</h2>
          <Form onSubmit={handleAddBook}>
            <FormGroup>
              <Label for="bookTitle">Title</Label>
              <Input
                type="text"
                name="bookTitle"
                id="bookTitle"
                value={bookTitle}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setBookTitle(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="bookAuthor">Author</Label>
              <Input
                type="select"
                name="bookAuthor"
                id="bookAuthor"
                value={bookAuthorId}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setBookAuthorId(e.target.value)}
              >
                <option value="">Select Author</option>
                {authors.map(author => (
                  <option key={author._id} value={author._id}>
                    {author.authorFirstName} {author.authorLastName}
                  </option>
                ))}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="bookCategory">Category</Label>
              <Input
                type="select"
                name="bookCategory"
                id="bookCategory"
                value={bookCategoryId}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setBookCategoryId(e.target.value)}
              >
                <option value="">Select Category</option>
                {categories.map(category => (
                  <option key={category._id} value={category._id}>
                    {category.categoryName}
                  </option>
                ))}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="bookPhoto">Photo URL</Label>
              <Input
                type="text"
                name="bookPhoto"
                id="bookPhoto"
                value={bookPhoto}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setBookPhoto(e.target.value)}
              />
            </FormGroup>
            <Button type="submit" color="primary">Add Book</Button>
          </Form>
        </Col>
      </Row>

      <Row>
        <Col>
          <h2>Categories</h2>
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category, index) => (
                <tr key={category._id}>
                  <th scope="row">{index + 1}</th>
                  <td>{category.categoryName}</td>
                  <td>
                    <Button color="danger" onClick={() => handleDeleteCategory(category._id)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
        
        <Col>
          <h2>Authors</h2>
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Date of Birth</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {authors.map((author, index) => (
                <tr key={author._id}>
                  <th scope="row">{index + 1}</th>
                  <td>{author.authorFirstName}</td>
                  <td>{author.authorLastName}</td>
                  <td>{author.authorDateOfBirth}</td>
                  <td>
                    <Button color="danger" onClick={() => handleDeleteAuthor(author._id)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
        
        <Col>
          <h2>Books</h2>
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Author</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book, index) => (
                <tr key={book._id}>
                  <th scope="row">{index + 1}</th>
                  <td>{book.title}</td>
                  <td>{book.authorId}</td>
                  <td>{book.categoryId}</td>
                  <td>
                    <Button color="danger" onClick={() => handleDeleteBook(book._id)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminPanel;
