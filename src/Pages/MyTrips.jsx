import { useEffect, useState } from "react";
import FormDetails from "../Components/FormDetails/FormDetails";
import Trips from "../Components/Trips/Trips";

function MyTrips() {

    const [start, setstart] = useState(false);
    const [search, setsearch] = useState();

    const handleStart = () => {
        setstart(!start)
    }

    const handleSearch = (data) => {
          setsearch(data);
    }

    useEffect(()=>{
        console.log(search)
    },[search])

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