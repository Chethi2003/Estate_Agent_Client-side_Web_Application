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
  const [isFavouritesOpen, setIsFavouritesOpen] =
    useState(false);

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
        <section className="search-section" id="search">
          <Search onSearch={handleSearch} />
        </section>

        <section className="results-shell">
          <div className="results-intro">
            <p className="results-kicker">Search results</p>
            <h2 className="results-title">Exceptional Properties</h2>
            <p className="results-summary">
              Showing {filteredProperties.length} of {allProperties.length}{" "}
              homes matching your current filters.
            </p>
          </div>

          <div className="results-panel">
            <PropertyList
              properties={filteredProperties}
              favourites={favourites}
              onToggleFavourite={onToggleFavourite}
            />
          </div>
        </section>
      </div>

      <div
        className={`favourites-overlay ${isFavouritesOpen ? "is-open" : ""}`}
      >
        <button
          type="button"
          className="favourites-trigger"
          onClick={() =>
            setIsFavouritesOpen((previousState) => !previousState)
          }
          aria-expanded={isFavouritesOpen}
          aria-controls="floating-favourites-panel"
          aria-label={
            isFavouritesOpen
              ? "Hide favourite properties"
              : "Show favourite properties"
          }
        >
          <span className="favourites-trigger-heart">♡</span>
          <span className="favourites-trigger-label">Favourites</span>
          <span className="favourites-trigger-count">
            {favourites.length}
          </span>
        </button>

        <div
          className="favourites-overlay-panel"
          id="floating-favourites-panel"
        >
          <Favourites
            favourites={favourites}
            allProperties={allProperties}
            onAddFavourite={onToggleFavourite}
          />
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Home;
