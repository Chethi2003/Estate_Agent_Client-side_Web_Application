import React, { useState } from "react";
import "./Welcome.css";

function Welcome() {
  return (
    <div className="welcome-container">
      <h1 className="welcome-title">Welcome to Grand Abode</h1>
      <p className="welcome-subtitle">
        Your ultimate platform for finding the perfect property.
      </p>
    </div>
  );
}

export default Welcome;
