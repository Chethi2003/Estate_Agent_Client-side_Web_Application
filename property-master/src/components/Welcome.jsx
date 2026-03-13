import React, { useState } from "react";
import "./Welcome.css";

function Welcome() {
  return (
    <div className="welcome-container">
      <h1 className="welcome-title">Refining the Art of Living</h1>
      <p className="welcome-subtitle">
        Discover hand-picked luxury estates and <b>bespoke residences</b> tailored to your lifestyle.
      </p>
    </div>
  );
}

export default Welcome;
