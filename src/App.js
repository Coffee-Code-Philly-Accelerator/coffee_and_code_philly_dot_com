import React from "react";
import "style.css";
import "tailwindcss/lib/css/preflight.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AboutUs from "./pages/AboutUs";
import ContactUs from "pages/ContactUs";
import Layout from "pages/Layout";
import Home from "pages/Home";
import Projects from "pages/Projects";
import OnboardingQuiz from "components/onboarding_quiz/OnboardingQuiz";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/about", element: <AboutUs /> },
        { path: "/projects", element: <Projects /> },
        { path: "/contact", element: <ContactUs /> },
        { path: "/join-us", element: <OnboardingQuiz /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
