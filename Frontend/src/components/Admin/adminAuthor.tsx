// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "./adminAuthor.css";

// interface Author {
//   authorId: number;
//   authorFirstName: string;
//   authorLastName: string;
//   authorDateOfBirth?: string;
// }

// const AdminAuthor: React.FC = () => {
//   const [authors, setAuthors] = useState<Author[]>([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios
//       .get("http://localhost:3100/authors")
//       .then((response) => {
//         setAuthors(response.data);
//       })
//       .catch((error) => {
//         console.error("There was an error fetching the authors!", error);
//       });
//   }, []);

//   const handleEdit = async (id: number) => {
//     const newFirstName = prompt("Enter the new first name for the author:");
//     const newLastName = prompt("Enter the new last name for the author:");
//     const newDateOfBirth = prompt(
//       "Enter the new date of birth for the author (optional):"
//     );

//     if (newFirstName && newLastName) {
//       try {
//         await axios.put(`http://localhost:3100/authors/${id}`, {
//           authorFirstName: newFirstName,
//           authorLastName: newLastName,
//           authorDateOfBirth: newDateOfBirth,
//         });
//         console.log("Author updated successfully");
//         const response = await axios.get("http://localhost:3100/authors");
//         setAuthors(response.data);
//       } catch (error) {
//         console.error("There was an error updating the author!", error);
//       }
//     }
//   };

//   const handleDelete = async (id: number) => {
//     if (window.confirm("Are you sure you want to delete this author?")) {
//       try {
//         await axios.delete(`http://localhost:3100/authors/${id}`);
//         console.log("Author deleted successfully");
//         const response = await axios.get("http://localhost:3100/authors");
//         setAuthors(response.data);
//       } catch (error) {
//         console.error("There was an error deleting the author!", error);
//       }
//     }
//   };

//   const handleAdd = async () => {
//     const firstName = prompt("Enter the first name for the new author:");
//     const lastName = prompt("Enter the last name for the new author:");
//     const dateOfBirth = prompt(
//       "Enter the date of birth for the new author (optional):"
//     );

//     if (firstName && lastName) {
//       try {
//         await axios.post("http://localhost:3100/authors", {
//           authorFirstName: firstName,
//           authorLastName: lastName,
//           authorDateOfBirth: dateOfBirth,
//         });
//         console.log("New author added successfully");
//         const response = await axios.get("http://localhost:3100/authors");
//         setAuthors(response.data);
//       } catch (error) {
//         console.error("There was an error adding the new author!", error);
//       }
//     }
//   };

//   const handleNavigation = (path: string) => {
//     navigate(path);
//   };

//   return (
//     <div className="authors-container">
//       <nav className="navbar">
//         <button
//           onClick={() => handleNavigation("/admin/category")}
//           className="nav-button"
//         >
//           Categories
//         </button>
//         <button
//           onClick={() => handleNavigation("/admin/books")}
//           className="nav-button"
//         >
//           Books
//         </button>
//         <button
//           onClick={() => handleNavigation("/admin/author")}
//           className="nav-button"
//         >
//           Authors
//         </button>
//       </nav>
//       <div className="authors-wrapper">
//         <div className="authors-header-wrapper">
//           <button onClick={handleAdd} className="add-button">
//             +
//           </button>
//         </div>
//         <table className="authors-table">
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>First Name</th>
//               <th>Last Name</th>
//               <th>Date of Birth</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {authors.map((author) => (
//               <tr key={author.authorId}>
//                 <td>{author.authorId}</td>
//                 <td>{author.authorFirstName}</td>
//                 <td>{author.authorLastName}</td>
//                 <td>{author.authorDateOfBirth || "N/A"}</td>
//                 <td className="table-actions">
//                   <button
//                     onClick={() => handleEdit(author.authorId)}
//                     className="edit-button"
//                   >
//                     ✏️
//                   </button>
//                   <button
//                     onClick={() => handleDelete(author.authorId)}
//                     className="delete-button"
//                   >
//                     🗑️
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default AdminAuthor;
// -----------------------------------------------------------------------
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "./adminAuthor.css";

// interface Author {
//   authorId: number;
//   authorFirstName: string;
//   authorLastName: string;
//   authorDateOfBirth?: string;
// }

// const AdminAuthor: React.FC = () => {
//   const [authors, setAuthors] = useState<Author[]>([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios
//       .get("http://localhost:3100/authors")
//       .then((response) => {
//         setAuthors(response.data);
//       })
//       .catch((error) => {
//         console.error("There was an error fetching the authors!", error);
//       });
//   }, []);

//   const handleEdit = async (id: number) => {
//     const newFirstName = prompt("Enter the new first name for the author:");
//     const newLastName = prompt("Enter the new last name for the author:");
//     const newDateOfBirth = prompt(
//       "Enter the new date of birth for the author (optional):"
//     );

//     if (newFirstName && newLastName) {
//       try {
//         await axios.put(`http://localhost:3100/authors/${id}`, {
//           authorFirstName: newFirstName,
//           authorLastName: newLastName,
//           authorDateOfBirth: newDateOfBirth,
//         });
//         console.log("Author updated successfully");
//         const response = await axios.get("http://localhost:3100/authors");
//         setAuthors(response.data);
//       } catch (error) {
//         console.error("There was an error updating the author!", error);
//       }
//     }
//   };

//   const handleDelete = async (id: number) => {
//     if (window.confirm("Are you sure you want to delete this author?")) {
//       try {
//         await axios.delete(`http://localhost:3100/authors/${id}`);
//         console.log("Author deleted successfully");
//         const response = await axios.get("http://localhost:3100/authors");
//         setAuthors(response.data);
//       } catch (error) {
//         console.error("There was an error deleting the author!", error);
//       }
//     }
//   };

//   const handleAdd = async () => {
//     const firstName = prompt("Enter the first name for the new author:");
//     const lastName = prompt("Enter the last name for the new author:");
//     const dateOfBirth = prompt(
//       "Enter the date of birth for the new author (optional):"
//     );

//     if (firstName && lastName) {
//       try {
//         await axios.post("http://localhost:3100/authors", {
//           authorFirstName: firstName,
//           authorLastName: lastName,
//           authorDateOfBirth: dateOfBirth,
//         });
//         console.log("New author added successfully");
//         const response = await axios.get("http://localhost:3100/authors");
//         setAuthors(response.data);
//       } catch (error) {
//         console.error("There was an error adding the new author!", error);
//       }
//     }
//   };

//   const handleNavigation = (path: string) => {
//     navigate(path);
//   };

//   return (
//     <div className="authors-container">
//       <nav className="navbar">
//         <button
//           onClick={() => handleNavigation("/admin/category")}
//           className="nav-button"
//         >
//           Categories
//         </button>
//         <button
//           onClick={() => handleNavigation("/admin/books")}
//           className="nav-button"
//         >
//           Books
//         </button>
//         <button
//           onClick={() => handleNavigation("/admin/author")}
//           className="nav-button"
//         >
//           Authors
//         </button>
//       </nav>
//       <div className="authors-wrapper">
//         <div className="authors-header-wrapper">
//           <button onClick={handleAdd} className="add-button">
//             +
//           </button>
//         </div>
//         <table className="authors-table">
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>First Name</th>
//               <th>Last Name</th>
//               <th>Date of Birth</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {authors.map((author) => (
//               <tr key={author.authorId}>
//                 <td>{author.authorId}</td>
//                 <td>{author.authorFirstName}</td>
//                 <td>{author.authorLastName}</td>
//                 <td>{author.authorDateOfBirth || "N/A"}</td>
//                 <td className="table-actions">
//                   <button
//                     onClick={() => handleEdit(author.authorId)}
//                     className="edit-button"
//                   >
//                     ✏️
//                   </button>
//                   <button
//                     onClick={() => handleDelete(author.authorId)}
//                     className="delete-button"
//                   >
//                     🗑️
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default AdminAuthor;

// -----------------------------------------------------------------------------
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./adminAuthor.css";

interface Author {
  authorId: number;
  authorFirstName: string;
  authorLastName: string;
  authorDateOfBirth?: string;
  photoUrl?: string; // Add this line
}

const AdminAuthor: React.FC = () => {
  const [authors, setAuthors] = useState<Author[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3100/authors")
      .then((response) => {
        setAuthors(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the authors!", error);
      });
  }, []);

  const handleEdit = async (id: number) => {
    const newFirstName = prompt("Enter the new first name for the author:");
    const newLastName = prompt("Enter the new last name for the author:");
    const newDateOfBirth = prompt(
      "Enter the new date of birth for the author (optional):"
    );
    const newPhotoUrl = prompt(
      "Enter the new photo URL for the author (optional):"
    ); // Add this line

    if (newFirstName && newLastName) {
      try {
        await axios.put(`http://localhost:3100/authors/${id}`, {
          authorFirstName: newFirstName,
          authorLastName: newLastName,
          authorDateOfBirth: newDateOfBirth,
          photoUrl: newPhotoUrl, // Add this line
        });
        console.log("Author updated successfully");
        const response = await axios.get("http://localhost:3100/authors");
        setAuthors(response.data);
      } catch (error) {
        console.error("There was an error updating the author!", error);
      }
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this author?")) {
      try {
        await axios.delete(`http://localhost:3100/authors/${id}`);
        console.log("Author deleted successfully");
        const response = await axios.get("http://localhost:3100/authors");
        setAuthors(response.data);
      } catch (error) {
        console.error("There was an error deleting the author!", error);
      }
    }
  };

  const handleAdd = async () => {
    const firstName = prompt("Enter the first name for the new author:");
    const lastName = prompt("Enter the last name for the new author:");
    const dateOfBirth = prompt(
      "Enter the date of birth for the new author (optional):"
    );
    const photoUrl = prompt(
      "Enter the photo URL for the new author (optional):"
    ); // Add this line

    if (firstName && lastName) {
      try {
        await axios.post("http://localhost:3100/authors", {
          authorFirstName: firstName,
          authorLastName: lastName,
          authorDateOfBirth: dateOfBirth,
          photoUrl: photoUrl, // Add this line
        });
        console.log("New author added successfully");
        const response = await axios.get("http://localhost:3100/authors");
        setAuthors(response.data);
      } catch (error) {
        console.error("There was an error adding the new author!", error);
      }
    }
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <div className="authors-container">
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
      <div className="authors-wrapper">
        <div className="authors-header-wrapper">
          <button onClick={handleAdd} className="add-button">
            +
          </button>
        </div>
        <table className="authors-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Photo</th> {/* Add this line */}
              <th>First Name</th>
              <th>Last Name</th>
              <th>Date of Birth</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {authors.map((author) => (
              <tr key={author.authorId}>
                <td>{author.authorId}</td>
                <td>
                  {author.photoUrl ? (
                    <img
                      src={author.photoUrl}
                      alt={`${author.authorFirstName} ${author.authorLastName}`}
                      className="author-photo"
                    />
                  ) : (
                    "No Photo"
                  )}
                </td>
                <td>{author.authorFirstName}</td>
                <td>{author.authorLastName}</td>
                <td>{author.authorDateOfBirth || "N/A"}</td>
                <td className="table-actions">
                  <button
                    onClick={() => handleEdit(author.authorId)}
                    className="edit-button"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => handleDelete(author.authorId)}
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

export default AdminAuthor;
