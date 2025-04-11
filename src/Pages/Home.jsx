import React, { useState, useEffect, useMemo } from "react";
import Banner from "../Components/Banner/Banner";
import Destinations from "../Components/Destinations/Destinations";
import Download from "../Components/Download/Download";
import Services from "../Components/Services/Services";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Spinner from "./Spinner";

function Home() {
  const navigate = useNavigate();
  const spinner = useSelector(state => state.spinner.spinnerCount);


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

  


  





  return (
    <>
    {spinner > 0 && <Spinner />}
    <div className={spinner > 0 ? "hidden" : ""}>
      <Banner />
      <Destinations />
      <Services />
      <Download />
    </div>
  </>

  );
}

export default Home;
