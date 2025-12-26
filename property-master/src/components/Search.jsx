import React, { useState } from "react";
import "./Search.css";

function Search({ onSearch }) {
  const [price, setPrice] = useState(1500000);
  const [bedrooms, setBedrooms] = useState(5);
  const [type, setType] = useState("Any");
  const [postcode, setPostcode] = useState("");

  const handleSearch = () => {
    // 🧠 prepare filters (not applied yet)
    const filters = {
      price,
      bedrooms,
      type,
      postcode,
    };

    // ✅ call parent ONLY if provided (safe)
    if (onSearch) {
      onSearch(filters);
    }
  };

  return (
    <div className="search-container">
      <h2 className="search-title">
        <span className="search-icon">🔍︎</span> Search Properties
      </h2>

      {/* Property Type */}
      <div className="form-group">
        <label>Property Type</label>
        <select
          className="select"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option>Any</option>
          <option>House</option>
          <option>Flat</option>
          <option>Detached House</option>
          <option>Apartment</option>
          <option>Bungalow</option>
        </select>
      </div>

      {/* Price Range */}
      <div className="form-group">
        <label>Price Range: £0 - £{Number(price).toLocaleString()}</label>
        <input
          type="range"
          min="0"
          max="1500000"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="range"
        />
      </div>

      {/* Bedrooms */}
      <div className="form-group">
        <label>Bedrooms: 1 - {bedrooms}</label>
        <input
          type="range"
          min="1"
          max="5"
          value={bedrooms}
          onChange={(e) => setBedrooms(e.target.value)}
          className="range"
        />
      </div>

      {/* Postcode */}
      <div className="form-group">
        <label>Postcode Area</label>
        <input
          type="text"
          placeholder="e.g. NW1, SW11"
          className="input"
          value={postcode}
          onChange={(e) => setPostcode(e.target.value)}
        />
      </div>

      {/* Button */}
      <button className="search-button" onClick={handleSearch}>
        Search Properties
      </button>
    </div>
  );
}

export default Search;
