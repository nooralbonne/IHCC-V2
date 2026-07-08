import React from "react";
import { Routes, Route } from "react-router-dom";

import TopBar from "./components/TopBar";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./components/pages/Home/HomePage.jsx";
import AboutPage from "./components/pages/About/AboutPage";
import Projects from "./components/Projects";
import ProjectDetails from "./components/pages/ProjectDetails/ProjectDetails";
import Clients from "./components/Clients";
import ServicesPage from "./components/pages/Services/ServicesPage";
import ContactPage from "./components/pages/Contact/ContactPage";

import "./App.css";

export default function App() {
  return (
    <div className="ihcc-app" dir="ltr">
      <TopBar />
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:slug" element={<ProjectDetails />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>

      <Footer />
    </div>
  );
}
