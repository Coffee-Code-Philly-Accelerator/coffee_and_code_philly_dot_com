// App.js

import React from "react";
import "style.css";
import "tailwindcss/lib/css/preflight.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AboutUs from "./pages/AboutUs";
import ContactUs from "pages/ContactUs";
import BlogIndex from "pages/BlogIndex";
import Layout from "pages/Layout";
import Events from "pages/Events";
import Home from "pages/Home";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/about", element: <AboutUs /> },
        { path: "/projects", element: <BlogIndex /> },
        { path: "/events", element: <Events /> },
        { path: "/contact", element: <ContactUs /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
