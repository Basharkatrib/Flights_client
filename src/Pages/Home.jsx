import React, { useState, useEffect, useMemo } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { setUser } from "../store/authSlice";
import Banner from "../Components/Banner/Banner";
import Destinations from "../Components/Destinations/Destinations";
import Download from "../Components/Download/Download";
import Services from "../Components/Services/Services";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setWidth } from "../store/screenWidthSlice";
import Spinner from "./Spinner";
import { load , Notload } from "../store/handleGoogleSlice";

function Home() {
  const navigate = useNavigate();
  const spinner = useSelector(state => state.spinner.spinnerCount);
  const dispatch = useDispatch();


  useEffect(() => {
    

    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get("access_token");


    if (accessToken) {
      dispatch(load());
      fetch(`https://flights-server.onrender.com/api/auth/google/callback?access_token=${accessToken}`)
        .then((response) => response.json())
        .then((data) => {
          dispatch(setUser(data));
          localStorage.setItem("jwt", data.jwt);
          navigate("/");
           toast.success('Login successfully!')
           dispatch(Notload());

        })
        .catch((error) => console.error(error));
         toast.error("Uncorrect email or password!");
         dispatch(Notload());
    }
  }, []);


  const [screenSize, getDimension] = useState({
    dynamicWidth: window.innerWidth,
    dynamicHeight: window.innerHeight
  });
  const setDimension = () => {
    getDimension({
      dynamicWidth: window.innerWidth,
      dynamicHeight: window.innerHeight
    })
  }
  
  useEffect(() => {
    window.addEventListener('resize', setDimension);
    
    return(() => {
        window.removeEventListener('resize', setDimension);
    })
  }, [screenSize])


  useEffect(()=>{
    dispatch(setWidth(screenSize.dynamicWidth))
  },[screenSize.dynamicWidth])



  return (
    <>
      <Banner />
      <Destinations />
      <Services />
      <Download />
  </>

  );
}

export default Home;
