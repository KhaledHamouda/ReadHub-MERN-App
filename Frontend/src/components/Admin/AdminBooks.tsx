import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminBooks.css'

interface Book {
  _id: string;
  title: string;
  photo: string;
  categoryId: string;
  authorId: string;
  idShow: string;
  categoryShow: string;
  authorShow: string;
}
interface Category {
  _id: string;
  categoryName: string;
  categoryId: string;
}
interface Author {
  _id: string;
  authorFirstName: string;
  authorLastName: string;
  authorDateOfBirth: string;
  authorId: string;
}

export default function AdminBooks() {
    const [books, setBooks] = useState<Book[]>([])
    const [categories, setCategories] = useState<Category[]>([])
    const [authors, setAuthors] = useState<Author[]>([])
    const [showForm, setShowForm] = useState(false)
    const [currentBook, setCurrentBook] = useState<Book | null>(null)

    useEffect(() => {
      handleDisplay();
      getCategories();
      getAuthors();
    }, [])

    const handleDisplay = () => {
        axios.get('http://localhost:3100/books')
        .then ((res) => {
          if(res.data){
            setBooks(res.data)
          }else{
            alert('Error Displaying Books!')
          }  
        })
        .catch(err => {
          console.error('Error: ' + err)
        })
    }

    const getCategories = () =>{
      axios.get('http://localhost:3100/categories')
      .then ((res) => {
        if(res.data){
          setCategories(res.data)
        }else{
          alert('Error Fetching Categories!')
        }  
      })
      .catch(err => {
        console.error('Error: ' + err)
      })
    }

    const getAuthors = () =>{
      axios.get('http://localhost:3100/authors')
      .then ((res) => {
        if(res.data){
          setAuthors(res.data)
        }else{
          alert('Error Fetching Authors!')
        }  
      })
      .catch(err => {
        console.error('Error: ' + err)
      })
    }

     const handleDelete = (id: string) => {
      const agree = confirm('Are you want to delete this book ?')
      if(agree){
        axios.delete(`http://localhost:3100/books/${id}`)
        .then ((res) => {
          if(res.data){
            handleDisplay();
          }else{
            alert('Error Deleting Book!')
          }  
        })
        .catch(err => {
          console.error('Error: ' + err)
        })
      }
   }

   const handleUpdate = (book: Book) => {
      setCurrentBook(book)
      setShowForm(true);
   }

   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (currentBook) {
      const { name, value } = e.target;
      setCurrentBook({
        ...currentBook,
        [name]: value
      });
    }
  };

   const handleUpdateSubmit = (id: string, e: React.FormEvent) => {
    if(currentBook){
      console.log(currentBook)
      axios.put(`http://localhost:3100/books/${id}`, currentBook)
      .then((res) => {
        if(res){
          handleDisplay();
        }else{
          alert('Error Updating Book!')
        }  
      })
      .catch(err => {
        console.error('Error: ' + err)
      })
    }
 }



  return (
    <>

<nav className="navbar navbar-expand-lg bg-light p-3">
  <div className="container-fluid">
    <div className="collapse navbar-collapse" id="navbarText">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item mx-2">
          <a className="nav-link fw-bold rounded border border-primary bg-warning" href="/admin/categories">Categories</a>
        </li>
        <li className="nav-item mx-2">
          <a className="nav-link fw-bold rounded border border-primary bg-warning" href="/admin/books">Books</a>
        </li>
        <li className="nav-item mx-2">
          <a className="nav-link fw-bold rounded border border-primary bg-warning" href="/admin/authors">Authors</a>
        </li>
      </ul>
    </div>
  </div>
</nav>

      <table className="table table-dark table-hover">
        <thead className='table-primary'>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Cover</th>
            <th scope="col">Title</th>
            <th scope="col">Category_id</th>
            <th scope="col">Author_id</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>

        <tbody>
        {books.length > 0 &&
          books.map((book) => {return(
              <tr key={book._id}>
                <td className="align-middle"> {book.idShow} </td>
                <td className="align-middle"> <img src={book.photo} alt="" width={100}/></td>
                <td className="align-middle"> {book.title} </td>
                <td className="align-middle"> {book.categoryShow} </td>
                <td className="align-middle"> {book.authorShow} </td>
                <td className="align-middle"> 
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-pen-fill" viewBox="0 0 16 16"
                  onClick={() => handleUpdate(book)}>
                    <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001"/>
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16"
                  onClick={()=>{handleDelete(book._id)}}>
                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
                  </svg> 
                </td>
              </tr>
            )
          })
        }
        </tbody>

    </table>
    {currentBook && showForm &&
        <form className='container rounded border bg-light' action="" id='updateForm'>

          <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" className="bi bi-x-circle-fill" viewBox="0 0 16 16"
          onClick={() => setShowForm(false)}>
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/>
          </svg>

          <div className="mb-3">
          <input type="text" onChange={handleInputChange} value={currentBook.idShow} className="form-control bg-Secondary text-dark" id="colFormLabelLg" placeholder="ID" name='idShow'/>
          </div>

          <div className="mb-3">
          <input type="text" onChange={handleInputChange} value={currentBook.title} className="form-control bg-Secondary text-dark" id="colFormLabelLg" placeholder="Book Title" name='title'/>
          </div>


          <div className="mb-3">  
              <input type="email" onChange={handleInputChange} value={currentBook.photo} className="form-control bg-Secondary text-dark" id="colFormLabelLg" placeholder="Image-URL" name='photo'/>
          </div> 

          <button type="button" onClick={(e) => {handleUpdateSubmit(currentBook._id, e)}} className="btn btn-outline-primary">Save Changes</button>


        </form>    
    }
  </>
  );
}
