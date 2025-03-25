import Banner from "../Components/Banner/Banner";
import Destinations from "../Components/Destinations/Destinations";
import Download from "../Components/Download/Download";
import Services from "../Components/Services/Services";

function Home(){
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