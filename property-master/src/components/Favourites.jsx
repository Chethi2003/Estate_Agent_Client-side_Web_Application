import { useNavigate } from "react-router-dom";
import "./Favourites.css";

function Favourites({
  favourites = [],
  allProperties = [],
  onAddFavourite,
}) {
  const navigate = useNavigate();

  const favouriteProperties = allProperties.filter((property) =>
    favourites.includes(property.id)
  );

  return (
    <div
      className="favourites-card"
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        const id = e.dataTransfer.getData("propertyId");
        if (onAddFavourite) {
          onAddFavourite(id);
        }
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
            <p>{property.type}</p>
            <span>
              £{property.price.toLocaleString()}
            </span>
          </div>
        ))
      )}
    </div>
  );
}

export default Favourites;
