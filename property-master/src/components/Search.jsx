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
    { value: "Semi-Detached House", label: "Semi Detached House" },
    { value: "Villa", label: "Villa" },
    { value: "Penthouse", label: "Penthouse" },
    { value: "Studio", label: "Studio" },
    { value: "Cottage", label: "Cottage" }
  ];

  const postcodeOptions = [
    { value: "BR1", label: "BR1" },
    { value: "BR5", label: "BR5" },
    { value: "BR6", label: "BR6" },
    { value: "BR7", label: "BR7" },
    { value: "DA14", label: "DA14" }
  ];

  return (
    <div className="search-toolbar">
      <div className="search-toolbar-grid">
        {/* Type */}
        <div className="toolbar-group">
          <label>Type</label>
          <Select
            options={typeOptions}
            onChange={setType}
            isClearable
            placeholder="Property Type"
            className="toolbar-select"
          />
        </div>

        {/* Max Price */}
        <div className="toolbar-group">
          <label>Max Price: £{price.toLocaleString()}</label>
          <Slider
            min={0}
            max={5000000}
            step={50000}
            value={price}
            onChange={setPrice}
          />
        </div>

        {/* Bedrooms */}
        <div className="toolbar-group">
          <label>Beds: {bedrooms}</label>
          <Slider
            min={1}
            max={8}
            step={1}
            value={bedrooms}
            onChange={setBedrooms}
          />
        </div>

        {/* Postcode */}
        <div className="toolbar-group">
          <label>Postcode</label>
          <Select
            options={postcodeOptions}
            onChange={setPostcode}
            isClearable
            placeholder="Area"
            className="toolbar-select"
          />
        </div>

        {/* Search Action */}
        <button className="toolbar-button" onClick={handleSearch}>
          Find Homes
        </button>
      </div>
    </div>
  );
}

export default Search;
