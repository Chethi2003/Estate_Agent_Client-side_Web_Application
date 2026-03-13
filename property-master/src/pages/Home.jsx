import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Home.css";

import Navigation from "../components/Navigation";
import Welcome from "../components/Welcome";
import Search from "../components/Search";
import Favourites from "../components/Favourites";
import Footer from "../components/Footer";
import PropertyList from "../components/PropertyList";

import propertiesData from "../data/properties.json";

function Home({ favourites, onToggleFavourite, theme, toggleTheme }) {
  const allProperties = propertiesData.properties;

  const [filteredProperties, setFilteredProperties] =
    useState(allProperties);

  const location = useLocation();

  // Scroll to search panel if URL contains #search
  useEffect(() => {
    if (location.hash === "#search") {
      const el = document.getElementById("search");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  const handleSearch = (filters) => {
    const results = allProperties.filter((property) => {
      if (filters.type !== "Any" && property.type !== filters.type)
        return false;

      if (property.price > Number(filters.price))
        return false;

      if (property.bedrooms > Number(filters.bedrooms))
        return false;

      if (
        filters.postcode &&
        !property.location
          .toLowerCase()
          .includes(filters.postcode.toLowerCase())
      )
        return false;

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
      <Navigation theme={theme} toggleTheme={toggleTheme} />
      <Welcome />

      <div className="main-content">
        {/* Horizontal Search Toolbar */}
        <section className="search-section">
          <Search onSearch={handleSearch} />
        </section>

        <div className="layout-grid">
          {/* Main Results Area */}
          <div className="results-area">
            <div className="results-panel">
              <PropertyList
                properties={filteredProperties}
                favourites={favourites}
                onToggleFavourite={onToggleFavourite}
              />
            </div>
          </div>

          {/* Sidebar Area */}
          <aside className="sidebar-area">
            <Favourites
              favourites={favourites}
              allProperties={allProperties}
              onAddFavourite={onToggleFavourite}
            />
          </aside>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Home;
