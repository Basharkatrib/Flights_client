import FormDetails from "../Components/FormDetails/FormDetails";
import Trips from "../Components/Trips/Trips";

function MyTrips() {
    return (
        <div className="w-full flex pt-16">
            <div className="basis-1/4">
                <FormDetails />
            </div>
            <div className="basis-3/4">
                <Trips />
            </div>
        </div>
    );
}
export default MyTrips;