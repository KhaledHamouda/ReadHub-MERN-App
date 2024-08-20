// // import bootstrapTable from 'react-bootstrap-table-next/lib/src/bootstrap-table';
// // import BootstrapTable from 'react-bootstrap-table-next/lib/src/bootstrap-table';
// // import axios from 'axios';
// import React from "react";
// import Utils from "./Utils";

// function Table(probs) {
//     // receiving the data for the table
//     const data = probs.data;
//     // receiving the headings of the table
//     const columns = probs.column;
//     // the order of the tab containing the table
//     const selectedtable = probs.table;

//     function TableHeadItem({ item }) {
//         return <th>{item.heading}</th>
//     }
//     function TableRow({ item, column, table }) {
//         return (
//             <tr>
//                 {React.Children.toArray(column.map((columnItem, index) => {
//                     return <td>
//                         {
//                             `${columnItem.heading}` === "Utils"
//                                 ?
//                                 <Utils table={table} item={item}
//                                     categories={probs.categriesData}
//                                     authors={probs.authorData} />
//                                 :
//                                 `${columnItem.heading}` === "Photo"
//                                     ?
//                                     <img src={item[`${columnItem.value}`]}
//                                         style={{ width: "30%", height: "100%" }}
//                                         className="img-fluid img-thumbnail"
//                                         alt="" />
//                                     :
//                                     !isNaN(Date.parse(item[columnItem.value])) && !(Number.isInteger(item[columnItem.value])) ?
//                                         new Date(item[columnItem.value]).toDateString()
//                                         : item[columnItem.value]
//                         }</td>
//                 }))}
//             </tr>)
//     }
//     return (
//         <div className="d-block table-responsive">
//             <table className="table table-striped table-hover table-bordered text-center">
//                 <thead>
//                     <tr>
//                         {React.Children.toArray(
//                             columns.map((item) => <TableHeadItem item={item} />)
//                         )}
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {React.Children.toArray(
//                         data.map((item) => <TableRow item={item}
//                             column={columns}
//                             table={selectedtable} />)
//                     )}
//                 </tbody>
//             </table>
//         </div>
//     )
// }

// export default Table;