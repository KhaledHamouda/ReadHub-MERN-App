import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./CategoryList.css";
import NavBar from "../homeComponents/Navbar";

interface Category {
  categoryId: number;
  categoryName: string;
}

const CategoryList: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get<Category[]>(
          "http://localhost:3100/categories"
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError("Error fetching categories.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div>
      <NavBar />
      <div className="category-list">
        {loading ? (
          <p>Loading categories...</p>
        ) : error ? (
          <p>{error}</p>
        ) : categories.length > 0 ? (
          categories.map((category) => (
            <div key={category.categoryId} className="category-item">
              <Link to={`/category/${category.categoryId}`}>
                <h2>{category.categoryName}</h2>
              </Link>
            </div>
          ))
        ) : (
          <p>No categories available.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryList;
