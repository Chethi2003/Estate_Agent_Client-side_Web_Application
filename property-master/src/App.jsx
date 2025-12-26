import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Properties from "./pages/Properties";
import Navigation from "./components/Navigation";

function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Properties />} />
      </Routes>
      
    </BrowserRouter>
  );
}

export default App;
