import React, { useState, useEffect } from "react";
import Banner from "../Components/Banner/Banner";
import Destinations from "../Components/Destinations/Destinations";
import Download from "../Components/Download/Download";
import Services from "../Components/Services/Services";
import { useNavigate } from "react-router-dom";
import { addSpinner, removeSpinner, selectSpinner } from "../store/spinnerSlice";
import { useSelector } from "react-redux";

function Home() {
  const navigate = useNavigate();
  const spinner = useSelector(state => state.spinner.spinnerCount)


  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get("access_token");

    if (accessToken) {
      fetch(`https://flights-server.onrender.com/api/auth/google/callback?access_token=${accessToken}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          localStorage.setItem("jwt", data.jwt);
          navigate("/");
        })
        .catch((error) => console.error(error));
    }
  }, []);

  useEffect(() => {
    console.log(spinner)
  }, [spinner])

 
  // if (spinner > 0) {
  //   return (
  //     <div className="w-full h-screen flex justify-center items-center">
  //       <div className="text-2xl font-bold animate-pulse">Loading ...</div>
  //     </div>
  //   );
  // }

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
