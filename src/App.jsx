import { useState } from "react";
import './App.css'
import Navbar from "./Components/Navbar/Navbar";
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Home from "./Pages/Home";
import Footer from "./Components/Footer/Footer";
import MyTrips from "./Pages/MyTrips";
import Checkout from "./Pages/Checkout";
import { useSelector } from "react-redux";


const App = () => {

  const navigate = useNavigate();
  const [ok, setOk] = useState(false);

  function RequireAuth({ children }) {
    const token = useSelector(state => state.auth.token);
    setOk(true);
    return token !== null ? children : navigate('/');
  }

  const handleClose = ()=>{
    setOk(false);
  }

  return (
    <>
      
        <Navbar ok={ok} handlee={handleClose}/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mytrips" element={<RequireAuth><MyTrips /></RequireAuth>} />
          <Route path="/checkout" element={<RequireAuth><Checkout /></RequireAuth>} />
        </Routes>
        <Footer />

    </>
  );
};
export default App;