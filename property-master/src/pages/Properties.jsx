import React from "react";
import data from "../data/properties.json";
import "./Properties.css";
import PropertyCard from "../components/PropertyCard";
import Navigation from "../components/Navigation.jsx";
import Footer from "../components/Footer.jsx";

function Properties({ favourites, onToggleFavourite, theme, toggleTheme }) {
  const properties = data.properties;

  return (
    <>
      <Navigation theme={theme} toggleTheme={toggleTheme} />

      <div className="properties-page">
        <h1 className="properties-title">
          All Properties
        </h1>

        <div className="properties-grid">
          {properties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              isFavourite={favourites.includes(property.id)}
              onToggleFavourite={onToggleFavourite}
            />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Properties;
