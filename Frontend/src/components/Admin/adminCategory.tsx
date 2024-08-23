import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./adminCategory.css";

interface Category {
  categoryId: number;
  categoryName: string;
}

const AdminCategory: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3100/categories")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the categories!", error);
      });
  }, []);

  const handleEdit = async (id: number) => {
    const newName = prompt("Enter the new name for the category:");
    if (newName) {
      try {
        await axios.put(`http://localhost:3100/categories/${id}`, {
          categoryName: newName,
        });
        console.log("Category updated successfully");
        const response = await axios.get("http://localhost:3100/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("There was an error updating the category!", error);
      }
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await axios.delete(`http://localhost:3100/categories/${id}`);
        console.log("Category deleted successfully");
        const response = await axios.get("http://localhost:3100/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("There was an error deleting the category!", error);
      }
    }
  };

  const handleAdd = async () => {
    const newName = prompt("Enter the name for the new category:");
    if (newName) {
      try {
        await axios.post("http://localhost:3100/categories", {
          categoryName: newName,
        });
        console.log("New category added successfully");
        const response = await axios.get("http://localhost:3100/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("There was an error adding the new category!", error);
      }
    }
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <div className="categories-container">
      <nav className="navbar">
        <button onClick={() => handleNavigation("/")} className="nav-button">
          Home
        </button>
        <button
          onClick={() => handleNavigation("/admin/categories")}
          className="nav-button"
        >
          Categories
        </button>
        <button
          onClick={() => handleNavigation("/admin/books")}
          className="nav-button"
        >
          Books
        </button>
        <button
          onClick={() => handleNavigation("/admin/authors")}
          className="nav-button"
        >
          Authors
        </button>
      </nav>
      <div className="categories-wrapper">
        <div className="categories-header-wrapper">
          <button onClick={handleAdd} className="add-button">
            +
          </button>
        </div>
        <table className="categories-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.categoryId}>
                <td>{category.categoryId}</td>
                <td>{category.categoryName}</td>
                <td className="table-actions">
                  <button
                    onClick={() => handleEdit(category.categoryId)}
                    className="edit-button"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => handleDelete(category.categoryId)}
                    className="delete-button"
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminCategory;
