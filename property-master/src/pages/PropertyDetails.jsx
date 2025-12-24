import React, { useState } from "react";
import { useParams } from "react-router-dom";
import data from "../data/properties.json";
import "./PropertyDetails.css";

function PropertyDetails() {
  const { id } = useParams();
  const property = data.properties.find((p) => p.id === id);
  const [activeTab, setActiveTab] = useState("description");

  if (!property) {
    return <h2 style={{ padding: "40px" }}>Property not found</h2>;
  }

  return (
    <div className="property-details-page">
      {/* IMAGE */}
      <div className="property-hero">
        <img src={`/${property.picture}`} alt={property.type} />
      </div>

      {/* THUMBNAILS (static for now) */}
      <div className="property-thumbs">
        <img src={`/${property.picture}`} alt="" className="active" />
        <img src={`/${property.picture}`} alt="" />
        <img src={`/${property.picture}`} alt="" />
        <img src={`/${property.picture}`} alt="" />
      </div>

      <div className="property-layout">
        {/* LEFT */}
        <div className="property-main">
          <div className="property-header">
            <h1>{property.type}</h1>
            <p className="location">{property.location}</p>
            <p className="price">£{property.price.toLocaleString()}</p>

            <div className="badges">
              <span>{property.bedrooms} Bedrooms</span>
              <span>{property.tenure}</span>
            </div>
          </div>

          {/* TABS */}
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

          {/* TAB CONTENT */}
          <div className="tab-content">
            {activeTab === "description" && (
              <>
                <h3>Property Description</h3>
                <p>{property.description}</p>

                <h4>Key Features</h4>
                <ul>
                  <li>{property.bedrooms} spacious bedrooms</li>
                  <li>Modern bathrooms</li>
                  <li>Excellent transport links</li>
                  <li>High quality finishes</li>
                </ul>
              </>
            )}

            {activeTab === "floor" && (
              <p>Floor plan coming soon…</p>
            )}

            {activeTab === "map" && (
              <p>Map view coming soon…</p>
            )}
          </div>
        </div>

        {/* RIGHT */}
        <aside className="property-sidebar">
          <h3>Contact Agent</h3>
          <button className="primary">Request Viewing</button>
          <button>Email Agent</button>
          <button>Call Agent</button>

          <div className="property-info">
            <h4>Property Details</h4>
            <p><strong>Type:</strong> {property.type}</p>
            <p><strong>Bedrooms:</strong> {property.bedrooms}</p>
            <p><strong>Tenure:</strong> {property.tenure}</p>
            <p>
              <strong>Date Added:</strong>{" "}
              {property.added.day}/{property.added.month}/{property.added.year}
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default PropertyDetails;
