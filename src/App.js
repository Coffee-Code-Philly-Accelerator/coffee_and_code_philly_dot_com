// App.js

import React from "react";
import "style.css";
import "tailwindcss/lib/css/preflight.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AboutUs from "./pages/AboutUs";
import ContactUs from "pages/ContactUs";
import Projects from "pages/Projects";
import Layout from "pages/Layout";
import Home from "pages/Home";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/about", element: <AboutUs /> },
        { path: "/projects", element: <Projects /> },
        { path: "/joinUs", element: <ContactUs /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
