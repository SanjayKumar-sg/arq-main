import React from "react";
import { Routes, Route } from "react-router-dom";
import { Helmet } from "react-helmet";

// Import pages
import Home from "./pages/Home";
import TeamPage from "./pages/Team";
import Events from "./pages/Events";
import Gallery from "./pages/Gallery";

// Import components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Helmet>
        <meta
          name="google-site-verification"
          content="PpfTxVPrPPPhq9nWhd6H0rQLOGU1EtStqQzyiDV4Rks"
        />
      </Helmet>

      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/events" element={<Events />} />
          <Route path="/gallery" element={<Gallery />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
