import { useState } from "react";
import './App.css'
import Navbar from "./Components/Navbar/Navbar";
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Home from "./Pages/Home";
import Footer from "./Components/Footer/Footer";
import MyTrips from "./Pages/MyTrips";
import Checkout from "./Pages/Checkout";
import Tickets from "./Pages/Tickets";
import BookedTrips from "./Pages/BookedTrips";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Profile from "./Pages/Profile";
import { useSelector } from "react-redux";
import toast, { Toaster } from 'react-hot-toast';



const App = () => {

  const navigate = useNavigate();
  const [ok, setOk] = useState(false);

  function RequireAuth({ children }) {
    const token = useSelector(state => state.auth.token);
    setOk(true);
    return token !== null ? children : navigate('/');
  }

  const handleClose = () => {
    setOk(false);
  }



  return (
    <>
      <Toaster />
      <Navbar ok={ok} handlee={handleClose} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/mytrips" element={<RequireAuth><MyTrips /></RequireAuth>} />
        <Route path="/checkout" element={<RequireAuth><Checkout /></RequireAuth>} />
        <Route path="/tickets" element={<RequireAuth><Tickets /></RequireAuth>} />
        <Route path="/booked" element={<RequireAuth><BookedTrips /></RequireAuth>} />
        <Route path="/profile" element={<RequireAuth><Profile /></RequireAuth>} />
      </Routes>
      <Footer />

    </>
  );
};
export default App;