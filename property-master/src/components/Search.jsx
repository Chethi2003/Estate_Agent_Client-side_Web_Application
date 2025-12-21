import React, { useState } from "react";
import "./Search.css";

function Search() {
  const [price, setPrice] = useState(1000000);
  const [bedrooms, setBedrooms] = useState(5);

  return (
    <div className="search-container">
      <h2 className="search-title">
        <span className="search-icon">🔍︎</span> Search Properties
      </h2>

      {/* Property Type */}
      <div className="form-group">
        <label>Property Type</label>
        <select className="select">
          <option>Any</option>
          <option>House</option>
          <option>Apartment</option>
          <option>Studio</option>
        </select>
      </div>

      {/* Price Range */}
      <div className="form-group">
        <label>Price Range: £0 - £{price.toLocaleString()}</label>
        <input
          type="range"
          min="0"
          max="1000000"
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
        />
      </div>

      {/* Button */}
      <button className="search-button">
         Search Properties
      </button>
    </div>
  );
}

export default Search;

