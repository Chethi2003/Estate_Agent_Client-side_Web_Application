import { useState } from "react";
import "./Home.css";

import Navigation from "../components/Navigation";
import Welcome from "../components/Welcome";
import Search from "../components/Search";
import Favourites from "../components/Favourites";
import Footer from "../components/Footer";
import PropertyList from "../components/PropertyList";

import propertiesData from "../data/properties.json";

function Home() {
  const allProperties = propertiesData.properties;

  const [filteredProperties, setFilteredProperties] =
    useState(allProperties);

  const [favourites, setFavourites] = useState([]);

  const handleSearch = (filters) => {
    const results = allProperties.filter((property) => {
      if (filters.type !== "Any" && property.type !== filters.type)
        return false;
      if (property.price > Number(filters.price)) return false;
      if (property.bedrooms > Number(filters.bedrooms)) return false;
      if (
        filters.postcode &&
        !property.location
          .toLowerCase()
          .includes(filters.postcode.toLowerCase())
      )
        return false;

      return true;
    });

    setFilteredProperties(results);
  };

  const toggleFavourite = (propertyId) => {
    setFavourites((prev) =>
      prev.includes(propertyId)
        ? prev.filter((id) => id !== propertyId)
        : [...prev, propertyId]
    );
  };

  return (
    <>
      <Navigation />
      <Welcome />

      <div className="main-content">
        {/* TOP ROW */}
        <div className="top-panel">
          <Search onSearch={handleSearch} />
          <Favourites
            favourites={favourites}
            allProperties={allProperties}
          />
        </div>

        {/* BOTTOM ROW */}
        <div className="results-panel">
          <PropertyList
            properties={filteredProperties}
            favourites={favourites}
            onToggleFavourite={toggleFavourite}
          />
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Home;
