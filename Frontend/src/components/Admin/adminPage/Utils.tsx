// import { useState } from 'react';
// import EditCategoryModal from './editCategoryModal';
// import EditBookModal from './editBookModal';
// import EditAuthorModal from './editAuthorModal';
// import DeleteModal from './deleteConfirmationModal';
// function Actions(probs) {
//     // the order of the current table
//     const currentTable = probs.table

//     // defining the state of the editCategoryModal
//     const [categoryModalIsOpen, setCategoryModal] = useState(false);
//     const categoryModalClose = () => setCategoryModal(false);
//     const categoryModalShow = () => setCategoryModal(true);

//     // defining the state of the editBookModal
//     const [bookModalIsOpen, setBookModal] = useState(false);
//     const bookModalClose = () => setBookModal(false);
//     const bookModalShow = () => setBookModal(true);

//     // defining the state of the editAuthorModal
//     const [authorModalIsOpen, setAuthorModal] = useState(false);
//     const authorModalClose = () => setAuthorModal(false);
//     const authorModalShow = () => setAuthorModal(true);

//     const [deleteModalIsOpen, setDeleteModal] = useState(false);
//     const deleteModalClose = () => {
//         setDeleteModal(false)
//     };
//     const deleteModalShow = () => {
//         setDeleteModal(true)
//     }
//     return (
//         <div>
//             {(currentTable === "first") && <div>
//                 <i className="fa fa-highlighter m-2 fa-xl" style={{ color: 'rgb(230, 105, 136)', cursor: 'pointer' }}
//                     onClick={categoryModalShow}></i>
//                 {categoryModalIsOpen && <EditCategoryModal state={categoryModalIsOpen}
//                     item={probs.item}
//                     onClick={categoryModalClose} />}
//                 <i className="fa fa-trash fa-xl m-2 fa-xl" style={{ color: 'rgb(230, 105, 136)', cursor: 'pointer' }}
//                     onClick={deleteModalShow}></i>
//                 {deleteModalIsOpen && <DeleteModal state={deleteModalIsOpen}
//                     item={probs.item}
//                     onClick={deleteModalClose}
//                     table={currentTable} />}
//             </div>}

//             {(currentTable === "second") && <div>
//                 <i className="fa fa-highlighter m-2 fa-xl" style={{ color: 'rgb(230, 105, 136)', cursor: 'pointer' }}
//                     onClick={bookModalShow}></i>
//                 {bookModalIsOpen && <EditBookModal state={bookModalIsOpen}
//                     item={probs.item}
//                     onClick={bookModalClose}
//                     categriesData={probs.categories}
//                     authorData={probs.authors} />}
//                 <i className="fa fa-trash fa-xl m-2 fa-xl" style={{ color: 'rgb(230, 105, 136)', cursor: 'pointer' }}
//                     onClick={deleteModalShow}></i>
//                 {deleteModalIsOpen && <DeleteModal state={deleteModalIsOpen}
//                     item={probs.item}
//                     onClick={deleteModalClose}
//                     table={currentTable} />}
//             </div>}

//             {(currentTable === "third") && <div>
//                 <i className="fa fa-highlighter m-2 fa-xl" style={{ color: 'rgb(230, 105, 136)', cursor: 'pointer' }}
//                     onClick={authorModalShow}></i>
//                 {authorModalIsOpen && <EditAuthorModal state={authorModalIsOpen}
//                     item={probs.item}
//                     onClick={authorModalClose} />}
//                 <i className="fa fa-trash fa-xl m-2 fa-xl" style={{ color: 'rgb(230, 105, 136)', cursor: 'pointer' }}
//                     onClick={deleteModalShow}></i>
//                 {deleteModalIsOpen && <DeleteModal state={deleteModalIsOpen}
//                     item={probs.item}
//                     onClick={deleteModalClose}
//                     table={currentTable} />}
//             </div>}
//         </div>
//     );
// }

// export default Actions;