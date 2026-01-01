import React, { useState } from "react";
import "./Search.css";

import Select from "react-select";
import Slider from "rc-slider";
import DatePicker from "react-datepicker";

import "rc-slider/assets/index.css";
import "react-datepicker/dist/react-datepicker.css";

function Search({ onSearch }) {
  const [price, setPrice] = useState(1500000);
  const [bedrooms, setBedrooms] = useState(5);
  const [type, setType] = useState(null);
  const [dateFrom, setDateFrom] = useState(null);
  const [postcode, setPostcode] = useState(null);

  const handleSearch = () => {
    const filters = {
      price,
      bedrooms,
      type: type ? type.value : "Any",
      postcode: postcode ? postcode.value : "",
      dateFrom
    };

    if (onSearch) {
      onSearch(filters);
    }
  };

  const typeOptions = [
    { value: "Any", label: "Any" },
    { value: "House", label: "House" },
    { value: "Flat", label: "Flat" },
    { value: "Detached House", label: "Detached House" },
    { value: "Apartment", label: "Apartment" },
    { value: "Bungalow", label: "Bungalow" },
    { value: "Terraced House", label: "Terraced House" },
    { value: "Semi-Detached House", label: "Semi Detached House" }
  ];

  const postcodeOptions = [
    { value: "BR1", label: "BR1" },
    { value: "BR5", label: "BR5" },
    { value: "BR6", label: "BR6" },
    { value: "BR7", label: "BR7" },
    { value: "DA14", label: "DA14" }
  ];

  return (
    <div className="search-container">
      <h2 className="search-title">
        <span className="search-icon">🔍︎</span> Search Properties
      </h2>

      {/* Property Type */}
      <div className="form-group">
        <label>Property Type</label>
        <Select
          options={typeOptions}
          onChange={setType}
          isClearable
        />
      </div>

      {/* Price */}
      <div className="form-group">
        <label>Max Price: £{price.toLocaleString()}</label>
        <Slider
          min={0}
          max={1500000}
          step={25000}
          value={price}
          onChange={setPrice}
        />
      </div>

      {/* Bedrooms */}
      <div className="form-group">
        <label>Bedrooms: 1 – {bedrooms}</label>
        <Slider
          min={1}
          max={5}
          step={1}
          value={bedrooms}
          onChange={setBedrooms}
        />
      </div>

      {/* Date Added */}
      <div className="form-group">
        <label>Date Added (From)</label>
        <DatePicker
          selected={dateFrom}
          onChange={(date) => setDateFrom(date)}
          dateFormat="dd/MM/yyyy"
          placeholderText="Select date"
          isClearable
        />
      </div>

      {/* Postcode */}
      <div className="form-group">
        <label>Postcode Area</label>
        <Select
          options={postcodeOptions}
          onChange={setPostcode}
          isClearable
        />
      </div>

      {/* Button (allowed to navigate))*/}
      <button className="search-button" onClick={handleSearch}>
        Search Properties
      </button>
    </div>
  );
}

export default Search;
