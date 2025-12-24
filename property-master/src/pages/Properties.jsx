import React from "react";
import data from "../data/properties.json";
import "./Properties.css";

function Properties() {
  const properties = data.properties;

  return (
    <div className="properties-page">
      <h1 className="properties-title">Available Properties</h1>

      <div className="properties-grid">
        {properties.map((property) => (
          <div className="property-card" key={property.id}>
            <img
              src={`/${property.picture}`}
              alt={property.type}
              className="property-image"
            />

            <div className="property-content">
              <h3 className="property-type">{property.type}</h3>

              <p className="property-location">{property.location}</p>

              <div className="property-details">
                <span>{property.bedrooms} Beds</span>
                <span>{property.tenure}</span>
              </div>

              <p className="property-price">
                £{property.price.toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Properties;
