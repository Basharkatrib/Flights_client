import React from "react";
import { useEffect } from "react";
import Banner from "../Components/Banner/Banner";
import Destinations from "../Components/Destinations/Destinations";
import Download from "../Components/Download/Download";
import Services from "../Components/Services/Services";
import { useNavigate } from "react-router-dom";

function Home(){
    const navigate = useNavigate();
    useEffect(() => {
        
        const urlParams = new URLSearchParams(window.location.search);
        const accessToken = urlParams.get("access_token"); 
       
    
        if (accessToken) {
          fetch(`https://flights-server.onrender.com/api/auth/google/callback?access_token=${accessToken}`)
            .then(response => response.json())
            .then(data => {
              console.log(data);
              localStorage.setItem("jwt", data.jwt); 
              navigate("/");

            })
            .catch(error => console.error(error));
        }
      }, []);
    return(
         <>
            <Banner />
            <Destinations />
            <Services />
            <Download />
         </>
    );
}
export default Home;