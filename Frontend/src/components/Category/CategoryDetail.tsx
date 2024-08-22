import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

interface Author {
  authorFirstName: string;
  authorLastName: string;
}

interface Book {
  _id: string; // Assuming each book has a unique ID
  title: string;
  photo: string;
  authorId: Author;
}

interface Category {
  categoryName: string;
  books: Book[];
}

const CategoryDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategoryDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3100/categories/${id}`
        );
        setCategory(response.data);
      } catch (error) {
        setError("Error fetching category details");
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryDetails();
  }, [id]);

  if (loading) {
    return <p>Loading category details...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!category) {
    return <p>Category not found.</p>;
  }

  return (
    <div className="category-detail">
      <h1>{category.categoryName}</h1>
      <div className="books-list">
        {category.books.map((book) => (
          <div key={book._id} className="book-item">
            <Link to={`/book/${book._id}`}>
              <img src={book.photo} alt={book.title} className="book-photo" />
              <h3>{book.title}</h3>
              <p>{`${book.authorId.authorFirstName} ${book.authorId.authorLastName}`}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryDetail;
