import React, { useState } from "react";
import { useParams } from "react-router-dom";
import data from "../data/properties.json";
import "./PropertyPage.css";
import Navigation from "../components/Navigation.jsx";
import Footer from "../components/Footer.jsx";

function PropertyPage({ favourites = [], onToggleFavourite }) {
  const { id } = useParams();

  const property = data.properties.find((p) => p.id === id);

  if (!property) {
    return <h2>Property not found</h2>;
  }

  const isFavourite = favourites.includes(property.id);

  // Images
  const images = property.images;
  const [activeImage, setActiveImage] = useState(images[0]);

  // Tabs
  const [activeTab, setActiveTab] = useState("description");

  return (
    <>
      <Navigation />

      <div className="property-page">
        {/* image gallery */}
        <div className="image-gallery">
          <img
            src={`/${activeImage}`}
            alt="Property"
            className="main-image"
          />

          <div className="thumbnails">
            {images.map((img, index) => (
              <img
                key={index}
                src={`/${img}`}
                alt={`Thumbnail ${index + 1}`}
                className={`thumbnail ${activeImage === img ? "active" : ""
                  }`}
                onClick={() => setActiveImage(img)}
              />
            ))}
          </div>
        </div>

        {/* property summery */}
        <div className="property-details-container">
          <button
            className={`favourite-btn property-summary-fav ${isFavourite ? "active" : ""
              }`}
            onClick={() => onToggleFavourite(property.id)}
          >
            ♥
          </button>

          <h1 className="property-title">{property.type}</h1>
          <p className="property-location">{property.location}</p>
          <p className="property-price">
            £{property.price.toLocaleString()}
          </p>
        </div>

        {/* tabs */}
        <div className="tabs">
          <button
            className={activeTab === "description" ? "active" : ""}
            onClick={() => setActiveTab("description")}
          >
            Description
          </button>

          <button
            className={activeTab === "floor" ? "active" : ""}
            onClick={() => setActiveTab("floor")}
          >
            Floor Plan
          </button>

          <button
            className={activeTab === "map" ? "active" : ""}
            onClick={() => setActiveTab("map")}
          >
            Map
          </button>
        </div>

        {/* tab content */}
        <div className="tab-content">
          {activeTab === "description" && (
            <div className="property-description">
              {property.description
                .split("<br>")
                .map((line, index) => (
                  <p key={index}>{line.trim()}</p>
                ))}
            </div>
          )}

          {activeTab === "floor" && (
            <div className="floorplan-container">
              <img
                src={`/${property.floorPlan}`}
                alt="Floor plan"
                className="floorplan"
              />
            </div>
          )}

          {activeTab === "map" && (
            <iframe
              title="map"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(
                property.location
              )}&output=embed`}
              width="100%"
              height="300"
              style={{ border: 0 }}
              loading="lazy"
            />
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default PropertyPage;
