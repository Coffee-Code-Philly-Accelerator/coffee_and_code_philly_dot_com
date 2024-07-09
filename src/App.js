// App.js

import React from "react";
import "style.css";
import "tailwindcss/lib/css/preflight.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AnimationRevealPage from "helpers/AnimationRevealPage";
import Hero from "components/hero/FullWidthWithImage";
import AboutUs from "./pages/AboutUs";
import ContactUs from "pages/ContactUs";
import BlogIndex from "pages/BlogIndex";
import Footer from "components/footers/FiveColumnWithInputForm.js";
import Events from "pages/Events";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <AnimationRevealPage>
              <Hero />
              <Footer />
            </AnimationRevealPage>
          }
        />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/projects" element={<BlogIndex />} />
        <Route path="/events" element={<Events />} />
        <Route path="/contact" element={<ContactUs />} />
      </Routes>
    </Router>
  );
}

export default App;
