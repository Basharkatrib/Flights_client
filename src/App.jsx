import { useState } from "react";
import './App.css'
import Navbar from "./Components/Navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./Pages/Home";
import Footer from "./Components/Footer/Footer";
import MyTrips from "./Pages/MyTrips";
const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mytrips" element={<MyTrips />} />
        </Routes>
        <Footer />
      </Router>

    </>
  );
};
export default App;