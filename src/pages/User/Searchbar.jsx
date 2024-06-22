// SearchBar.js
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/material/styles";

const StyledTextField = styled(TextField)({
  "& .MuiInputBase-input": {
    color: "white", // Text color
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "white", // Border color
    },
    "&:hover fieldset": {
      borderColor: "white", // Border color on hover
    },
    "&.Mui-focused fieldset": {
      borderColor: "white", // Border color when focused
    },
  },
  "& .MuiInputAdornment-root": {
    color: "white", // Icon color
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "white", // Notched outline color
  },
});

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      onSearch(query);
    }
  };

  return (
    <StyledTextField
      variant="outlined"
      fullWidth
      placeholder="Search..."
      value={query}
      onChange={handleInputChange}
      onKeyPress={handleKeyPress}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchBar;
