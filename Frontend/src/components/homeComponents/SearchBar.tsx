import React, { useState, useEffect } from "react";
import "./SearchBar.css";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

type SearchBarProps = {
  type: "Books" | "Categories" | "Authors";
  action: () => void;
};

type Book = {
  _id: string;
  title: string;
};

type Category = {
  _id: string;
  Name: string;
};

type Author = {
  _id: string;
  fName: string;
  lName: string;
};

type Data = Book | Category | Author;

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const SearchBar: React.FC<SearchBarProps> = (props) => {
  const [filteredData, setFilteredData] = useState<Data[]>([]);
  const [data, setData] = useState<Data[]>([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:3100/${props.type.toLowerCase()}`);
      setData(response.data);
      sessionStorage.setItem(`${props.type}Data`, JSON.stringify(response.data));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    const storedData = JSON.parse(sessionStorage.getItem(`${props.type}Data`) || "[]");
    if (storedData.length > 0) {
      setData(storedData);
    } else {
      fetchData();
    }
  }, [props.type]);

  const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchWord = event.target.value.toLowerCase();
    const newFilter = data.filter((value) => {
      if (props.type === "Books") {
        return (value as Book).title.toLowerCase().includes(searchWord);
      } else if (props.type === "Categories") {
        return (value as Category).Name.toLowerCase().includes(searchWord);
      } else {
        return (
          (value as Author).fName.toLowerCase().includes(searchWord) ||
          (value as Author).lName.toLowerCase().includes(searchWord)
        );
      }
    });

    setFilteredData(searchWord ? newFilter : []);
  };

  return (
    <div className="search">
      <div className="searchInputs">
        <Search className="mr-3 max-w-[100%] border-1">
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            sx={{ width: "100%" }}
            placeholder="Search..."
            onChange={handleFilter}
            inputProps={{ "aria-label": "search" }}
          />
        </Search>
      </div>
      {filteredData.length !== 0 && (
        <div className="dataResult">
          {filteredData.slice(0, 15).map((value) => (
            <h5
              className="dataItem"
              onClick={() => navigate(value._id)}
              key={value._id}
            >
              <p>
                {props.type === "Books"
                  ? (value as Book).title
                  : props.type === "Categories"
                  ? (value as Category).Name
                  : (value as Author).fName + " " + (value as Author).lName}
              </p>
            </h5>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;


// components/SearchBar.tsx

// import React, { useState } from 'react';
// import { TextField, Button } from '@mui/material';
// import axiosInstance from '../../axios';

// const SearchBar: React.FC = () => {
//   const [query, setQuery] = useState('');
//   const [results, setResults] = useState<any[]>([]);

//   const handleSearch = async () => {
//     try {
//       const response = await axiosInstance.get(`/books/search`, {
//         params: { query }
//       });
//       setResults(response.data);
//     } catch (error) {
//       console.error('Error fetching search results:', error);
//     }
//   };

//   return (
//     <div>
//       <TextField
//         label="Search for books"
//         variant="outlined"
//         value={query}
//         onChange={(e) => setQuery(e.target.value)}
//       />
//       <Button variant="contained" color="primary" onClick={handleSearch}>
//         Search
//       </Button>
//       <div>
//         {results.map((book) => (
//           <div key={book._id}>
//             <h3>{book.title}</h3>
//             <p>{book.author}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SearchBar;
