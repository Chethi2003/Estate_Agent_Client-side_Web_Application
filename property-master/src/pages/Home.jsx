import { useState } from "react";
import "./Home.css";

import Navigation from "../components/Navigation.jsx";
import Welcome from "../components/Welcome.jsx";
import Search from "../components/Search.jsx";
import Favourites from "../components/Favourites.jsx";
import Footer from "../components/Footer.jsx";

function Home() {
  // 🧠 shared state (not used yet)
  const [favourites, setFavourites] = useState([]);

  return (
    <>
      <Navigation />
      <Welcome />

      <div className="main-content">
        <Search />
        <Favourites />
      </div>

      <Footer />
    </>
  );
}

export default Home;
