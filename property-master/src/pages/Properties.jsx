import React from "react";
import data from "../data/properties.json";
import "./Properties.css";
import Navigation from "../components/Navigation.jsx";

function Properties() {
  const properties = data.properties;

  return (
    <>
    <Navigation />
    
    </>
  );
}

export default Properties;
