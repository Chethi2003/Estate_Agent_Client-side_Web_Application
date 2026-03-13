import { useNavigate } from "react-router-dom";
import "./Favourites.css";

function Favourites({
  favourites = [],
  allProperties = [],
  onAddFavourite,
}) {
  const navigate = useNavigate();

  const favouriteProperties = allProperties.filter(
    (property) => favourites.includes(property.id)
  );

  return (
    <div
      className="favourites-sidebar"
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        const id = e.dataTransfer.getData("propertyId");
        if (id) onAddFavourite(id);
      }}
    >
      <div className="favourites-header">
        <span className="heart-icon">♡</span>
        <h3>Favourite Properties</h3>
      </div>

      {favouriteProperties.length === 0 ? (
        <div className="favourites-empty">
          <div className="heart-large">♡</div>
          <p className="empty-title">
            No favourite properties yet
          </p>
          <p className="empty-subtitle">
            Click the heart icon or drag a property here
          </p>
        </div>
      ) : (
        favouriteProperties.map((property) => (
          <div
            key={property.id}
            className="favourite-item"
            onClick={() =>
              navigate(`/property/${property.id}`)
            }
          >
            <div className="favourite-info">
              <p className="favourite-title">
                {property.type}
              </p>
              <span className="favourite-price">
                £{property.price.toLocaleString()}
              </span>
            </div>

            {/* Remove Button */}
            <button
              className="remove-favourite"
              onClick={(e) => {
                e.stopPropagation(); // prevent navigation
                onAddFavourite(property.id);
              }}
              aria-label="Remove favourite"
            >
              ✕
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default Favourites;
