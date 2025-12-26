import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./PropertyCard.css";

function PropertyCard({
  property,
  isFavourite: isFavouriteProp,
  onToggleFavourite,
}) {
  const navigate = useNavigate();

  // 🔁 local fallback state (for now)
  const [isFavourite, setIsFavourite] = useState(false);

  // ✅ Sync from props OR localStorage
  useEffect(() => {
    if (typeof isFavouriteProp === "boolean") {
      setIsFavourite(isFavouriteProp);
    } else {
      const favourites =
        JSON.parse(localStorage.getItem("favourites")) || [];
      setIsFavourite(favourites.includes(property.id));
    }
  }, [isFavouriteProp, property.id]);

  const handleFavouriteClick = (e) => {
    e.stopPropagation(); // 🚫 prevent card click

    // 🧠 If parent controls it, delegate
    if (onToggleFavourite) {
      onToggleFavourite(property.id);
      return;
    }

    // 🧠 Otherwise use localStorage (current behaviour)
    let favourites =
      JSON.parse(localStorage.getItem("favourites")) || [];

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
        onClick={handleFavouriteClick}
        aria-label="Add to favourites"
      >
        ♥
      </button>

      <div className="property-card-image-wrapper">
        <img
          src={`/${property.picture}`}
          alt={property.type}
          className="property-card-image"
        />
      </div>

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
