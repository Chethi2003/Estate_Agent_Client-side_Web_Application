import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./pages/Home";
import Properties from "./pages/Properties";
import PropertyPage from "./pages/PropertyPage";

function App() {
  const [favourites, setFavourites] = useState([]);

  // Load favourites once
  useEffect(() => {
    const stored =
      JSON.parse(localStorage.getItem("favourites")) || [];
    setFavourites(stored);
  }, []);

  // Persist favourites
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
    <BrowserRouter>
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
