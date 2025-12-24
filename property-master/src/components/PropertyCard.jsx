import React from "react";
import { useNavigate } from "react-router-dom";
import "./PropertyCard.css";

function PropertyCard({ property }) {
  const navigate = useNavigate();

  return (
    <div
      className="property-card"
      onClick={() => navigate(`/property/${property.id}`)}
    >
      <img
        src={`/${property.picture}`}
        alt={property.type}
        className="property-card-image"
      />

      <div className="property-card-content">
        <h3 className="property-card-title">{property.type}</h3>
        <p className="property-card-location">{property.location}</p>

        <div className="property-card-meta">
          <span>{property.bedrooms} Beds</span>
          <span>{property.tenure}</span>
        </div>

        <p className="property-card-price">
          £{property.price.toLocaleString()}
        </p>
      </div>
    </div>
  );
}

export default PropertyCard;
