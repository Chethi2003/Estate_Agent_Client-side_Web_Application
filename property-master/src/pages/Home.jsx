import { useState } from "react";
import "./Home.css";

import Navigation from "../components/Navigation";
import Welcome from "../components/Welcome";
import Search from "../components/Search";
import Favourites from "../components/Favourites";
import Footer from "../components/Footer";
import PropertyList from "../components/PropertyList";

import propertiesData from "../data/properties.json";

function Home({ favourites, onToggleFavourite }) {
  const allProperties = propertiesData.properties;

  const [filteredProperties, setFilteredProperties] =
    useState(allProperties);

  const handleSearch = (filters) => {
    const results = allProperties.filter((property) => {
      // Property type
      if (filters.type !== "Any" && property.type !== filters.type)
        return false;

      // Price
      if (property.price > Number(filters.price))
        return false;

      // Bedrooms
      if (property.bedrooms > Number(filters.bedrooms))
        return false;

      // Postcode
      if (
        filters.postcode &&
        !property.location
          .toLowerCase()
          .includes(filters.postcode.toLowerCase())
      )
        return false;

      // ✅ DATE FILTER (FIXED FOR YOUR JSON)
      if (filters.dateFrom) {
        const selectedDate = new Date(filters.dateFrom);

        const propertyDate = new Date(
          `${property.added.month} ${property.added.day}, ${property.added.year}`
        );

        if (propertyDate < selectedDate) return false;
      }

      return true;
    });

    setFilteredProperties(results);
  };

  return (
    <>
      <Navigation />
      <Welcome />

      <div className="main-content">
        <div className="top-panel">
          <Search onSearch={handleSearch} />

          <Favourites
            favourites={favourites}
            allProperties={allProperties}
            onAddFavourite={onToggleFavourite}
          />
        </div>

        <div className="results-panel">
          <PropertyList
            properties={filteredProperties}
            favourites={favourites}
            onToggleFavourite={onToggleFavourite}
          />
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Home;
