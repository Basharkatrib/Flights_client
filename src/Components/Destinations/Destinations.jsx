import FlightCard from "../FlightCard/FlightCard";
import { useEffect, useState } from "react";
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";

function Destinations(){
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const lang = useSelector(state => state.lang.lang);

    useEffect(()=>{
        const fetchData = async () => {
            try{
                const response = await axios.get(`${import.meta.env.VITE_API_KEY}/api/topdests?locale=${lang}&populate=trip.image`);
                setData(response.data.data[0]);
            }catch(error){
                console.log(error);
            }finally{
                setLoading(false);
            }
        }
        fetchData();
    },[lang]);

  

   if(loading){
    return <div>Loading ...</div>
   }

    return(
        <div className="w-full flex flex-col p-4 mt-20">
          {data && data.title && <div className="text-[32px] font-bold">{data.title}</div>}
          <div className="w-full flex flex-wrap justify-between gap-5 md:gap-0 xl:gap-0">
              {
                data && data.trip && data.trip.map((item, index)=>{
                    return(
                        <FlightCard key={index} item={item}/>
                        
                    ) 
                })
              }
          </div>
        </div>
    );
}
export default Destinations;