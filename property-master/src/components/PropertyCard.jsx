import { useNavigate } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaBed,
  FaFileAlt,
} from "react-icons/fa";
import "./PropertyCard.css";

function PropertyCard({
  property,
  isFavourite,
  onToggleFavourite,
}) {
  const navigate = useNavigate();

  const handleFavouriteClick = (e) => {
    e.stopPropagation();
    onToggleFavourite(property.id);
  };

  const handleDragStart = (e) => {
    e.dataTransfer.setData("propertyId", property.id);
  };

  return (
    <div
      className="property-card"
      data-testid="property-card"
      draggable
      onDragStart={handleDragStart}
      onClick={() => navigate(`/property/${property.id}`)}
    >
      <button
        className={`favourite-btn ${
          isFavourite ? "active" : ""
        }`}
        onClick={handleFavouriteClick}
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
        <h3 className="property-card-title">
          {property.type}
        </h3>

        <div className="info-row">
          <FaMapMarkerAlt />
          <span>{property.location}</span>
        </div>

        <div className="property-card-meta">
          <div className="info-row">
            <FaBed />
            <span>{property.bedrooms} Beds</span>
          </div>

          <div className="info-row">
            <FaFileAlt />
            <span>{property.tenure}</span>
          </div>
        </div>

        <p className="property-card-price">
          £{property.price.toLocaleString()}
        </p>
      </div>
    </div>
  );
}

export default PropertyCard;
