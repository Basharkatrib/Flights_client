import { useEffect, useState } from "react";
import FormDetails from "../Components/FormDetails/FormDetails";
import Trips from "../Components/Trips/Trips";
import Spinner from "./Spinner";
import { useSelector } from "react-redux";

function MyTrips() {

    const [start, setstart] = useState(false);
    const [search, setsearch] = useState();
    const spinner = useSelector(state => state.spinner.spinnerCount);
    const [loading, setLoading] = useState(true);

    const handleStart = () => {
        setstart(!start)
    }

    const handleSearch = (data) => {
          setsearch(data);
          
    }

    useEffect(()=>{
        console.log(search)
    },[search])


    useEffect(()=>{
        if(spinner === 0) {
          setLoading(false);
        }
      },[spinner])
      
    
    
      useEffect(()=>{
          console.log(spinner)
      },[spinner])
      
    
      if (loading) return <Spinner />

    return (
        <div className="w-full flex pt-16">
            <div className={`${start ? 'w-full block' : 'hidden'} md:basis-1/4 md:block md:opacity-100`}>
                <FormDetails handle = {handleStart} handleSearch = {handleSearch}/>
            </div>
            <div className={`${start ? 'hidden ' : 'block w-full'} md:basis-3/4 md:block md:opacity-100`}>
                <Trips handle={handleStart} search={search}/>
            </div>
        </div>
    );
}
export default MyTrips;