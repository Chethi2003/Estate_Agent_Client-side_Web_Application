import React from "react";
import data from "../data/properties.json";
import "./Properties.css";
import PropertyCard from "../components/PropertyCard";
import Navigation from "../components/Navigation.jsx";

function Properties() {
  const properties = data.properties;

  return (
    <>
    <Navigation />

    <div className="properties-page">
      <h1 className="properties-title">Available Properties</h1>

      <div className="properties-grid">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
    
    </>
  );
}

export default Properties;
