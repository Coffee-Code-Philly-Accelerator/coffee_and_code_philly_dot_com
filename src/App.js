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
import OnboardingQuiz from "components/onboarding_quiz/OnboardingQuiz";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/about", element: <AboutUs /> },
<<<<<<< HEAD
        { path: "/projects", element: <Projects /> },
        { path: "/joinUs", element: <ContactUs /> },
=======
        { path: "/projects", element: <BlogIndex /> },
        { path: "/events", element: <Events /> },
        { path: "/contact", element: <ContactUs /> },
        { path: "/join-us", element: <OnboardingQuiz /> },
>>>>>>> eea14a0 (WIP implement form validation on onboarding quiz)
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
