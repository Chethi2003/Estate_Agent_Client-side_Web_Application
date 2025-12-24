import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./PropertyCard.css";

function PropertyCard({ property }) {
  const navigate = useNavigate();
  const [isFavourite, setIsFavourite] = useState(false);

  // Load favourites on mount
  useEffect(() => {
    const favourites = JSON.parse(localStorage.getItem("favourites")) || [];
    setIsFavourite(favourites.includes(property.id));
  }, [property.id]);

  const toggleFavourite = (e) => {
    e.stopPropagation(); // 🚫 prevent card click

    let favourites = JSON.parse(localStorage.getItem("favourites")) || [];

    if (favourites.includes(property.id)) {
      favourites = favourites.filter((id) => id !== property.id);
      setIsFavourite(false);
    } else {
      favourites.push(property.id);
      setIsFavourite(true);
    }

    localStorage.setItem("favourites", JSON.stringify(favourites));
  };

  return (
    <div
      className="property-card"
      onClick={() => navigate(`/property/${property.id}`)}
    >
      {/* ❤️ Favourite Icon */}
      <button
        className={`favourite-btn ${isFavourite ? "active" : ""}`}
        onClick={toggleFavourite}
        aria-label="Add to favourites"
      >
        ♥
      </button>

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
