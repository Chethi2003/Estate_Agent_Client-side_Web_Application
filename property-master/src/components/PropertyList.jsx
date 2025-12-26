import PropertyCard from "./PropertyCard.jsx";

function PropertyList({ properties = [], favourites = [] }) {
  return (
    <div className="results-grid">
      {properties.map((property) => (
        <PropertyCard
          key={property.id}
          property={property}
          isFavourite={favourites.includes(property.id)}
        />
      ))}
    </div>
  );
}

export default PropertyList;
