import { useState } from "react";
import "./Home.css";

import Navigation from "../components/Navigation.jsx";
import Welcome from "../components/Welcome.jsx";
import Search from "../components/Search.jsx";
import Favourites from "../components/Favourites.jsx";
import Footer from "../components/Footer.jsx";
import PropertyCard from "../components/PropertyCard.jsx";

import properties from "../data/properties";

function Home() {
  const [filteredProperties, setFilteredProperties] = useState(properties);
  const [favourites, setFavourites] = useState([]);

  // ❤️ Toggle favourite
  const toggleFavourite = (propertyId) => {
    setFavourites((prev) =>
      prev.includes(propertyId)
        ? prev.filter((id) => id !== propertyId)
        : [...prev, propertyId]
    );
  };

  return (
    <>
      <Navigation />
      <Welcome />

      <div className="main-content">
        <Search onResults={setFilteredProperties} />

        {/* 🔍 SEARCH RESULTS */}
        <div className="results-grid">
          {filteredProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              isFavourite={favourites.includes(property.id)}
              onToggleFavourite={toggleFavourite}
            />
          ))}
        </div>

        <Favourites
          favourites={favourites}
          properties={properties}
        />
      </div>

      <Footer />
    </>
  );
}

export default Home;
