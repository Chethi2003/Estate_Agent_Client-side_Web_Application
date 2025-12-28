import React from "react";
import { useParams } from "react-router-dom";
import data from "../data/properties.json";
import "./PropertyPage.css";
import Navigation from "../components/Navigation.jsx";  

function PropertyPage() {
 const { id } = useParams();

  const property = data.properties.find(
    (p) => p.id === id
  );

  if (!property) {
    return <h2>Property not found</h2>;
  }



    return (
        <>
        <Navigation />      
        <div className="property-page">
            <p>Property ID: {id}</p>

            <div className="property-details-container">
                <p>{property.location}</p>
<p>£{property.price.toLocaleString()}</p>

            </div>
        </div>
        </>
    );
}

export default PropertyPage;