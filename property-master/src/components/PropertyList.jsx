import PropertyCard from "./PropertyCard";

function PropertyList({
  properties = [],
  favourites = [],
  onToggleFavourite,
}) {
  return (
    <div className="results-grid">
      {properties.map((property) => (
        <PropertyCard
          key={property.id}
          property={property}
          isFavourite={favourites.includes(property.id)}
          onToggleFavourite={onToggleFavourite}
        />
      ))}
    </div>
  );
}

export default PropertyList;
