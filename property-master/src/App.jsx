import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Properties from "./pages/Properties";
import PropertyPage from "./pages/PropertyPage";
import ContactUs from "./pages/ContactUs";

function App() {
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    const stored =
      JSON.parse(localStorage.getItem("favourites")) || [];
    setFavourites(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "favourites",
      JSON.stringify(favourites)
    );
  }, [favourites]);

  const toggleFavourite = (propertyId) => {
    setFavourites((prev) =>
      prev.includes(propertyId)
        ? prev.filter((id) => id !== propertyId)
        : [...prev, propertyId]
    );
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Home
            favourites={favourites}
            onToggleFavourite={toggleFavourite}
          />
        }
      />

      <Route path="/about" element={<AboutUs />} />

      <Route
        path="/search"
        element={
          <Properties
            favourites={favourites}
            onToggleFavourite={toggleFavourite}
          />
        }
      />

      <Route
        path="/property/:id"
        element={
          <PropertyPage
            favourites={favourites}
            onToggleFavourite={toggleFavourite}
          />
        }
      />

      <Route path="/contact" element={<ContactUs />} />
    </Routes>
  );
}

export default App;
