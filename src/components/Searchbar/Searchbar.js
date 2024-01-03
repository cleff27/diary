import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
export default function Searchbar() {
  const [searchvalue, setSearchvalue] = useState("");
  const navigate = useNavigate();
  const handleDetailChange = (event) => {
    const value = event.target.value;
    //const name = event.target.name;
    setSearchvalue(value);
  };
  const handleSearch = (event) => {
    event.preventDefault();
    const value = searchvalue;
    setSearchvalue("");
    if (value.trim() !== "") navigate("/searchresult/" + value);
  };
  return (
    <div>
      <form className="d-flex" role="search">
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={searchvalue}
          onChange={handleDetailChange}
        />
        <button className="btn btn-outline-primary" onClick={handleSearch}>
          <SearchIcon />
        </button>
      </form>
    </div>
  );
}
