import FlightCard from "../FlightCard/FlightCard";
import { useEffect, useState, useRef } from "react";
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { addSpinner, removeSpinner, selectSpinner } from "../../store/spinnerSlice";
import Skelaton from "../Skelaton/Skelaton";
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import AOS from "aos";
import "aos/dist/aos.css";

// Fix for default marker icon in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Component to fly to destination and open popup
function FlyToDestination({ destination, markerRefs }) {
  const map = useMap();
  
  useEffect(() => {
    if (destination) {
      map.flyTo(destination.coordinates, 10, {
        duration: 2
      });
      
      // Open popup after flying
      setTimeout(() => {
        const marker = markerRefs.current[destination.id];
        if (marker) {
          marker.openPopup();
        }
      }, 2000);
    }
  }, [destination, map, markerRefs]);
  
  return null;
}

function Destinations(){
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showMap, setShowMap] = useState(false);
    const [mapKey, setMapKey] = useState(0);
    const [selectedDestination, setSelectedDestination] = useState(null);
    const markerRefs = useRef({});
    const lang = useSelector(state => state.lang.lang);
    const dispatch = useDispatch();

    // Mock destinations data with coordinates
    const mockDestinations = [
        {
            id: 1,
            name: lang === "ar" ? "دبي" : "Dubai",
            country: lang === "ar" ? "الإمارات العربية المتحدة" : "UAE",
            coordinates: [25.2048, 55.2708],
            price: "$299",
            image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400",
            description: lang === "ar" ? "مدينة المستقبل والفخامة" : "City of Future and Luxury"
        },
        {
            id: 2,
            name: lang === "ar" ? "القاهرة" : "Cairo",
            country: lang === "ar" ? "مصر" : "Egypt",
            coordinates: [30.0444, 31.2357],
            price: "$199",
            image: "https://images.unsplash.com/photo-1572252009286-268acec5ca0a?w=400",
            description: lang === "ar" ? "أرض الحضارة والتاريخ" : "Land of Civilization and History"
        },
        {
            id: 3,
            name: lang === "ar" ? "باريس" : "Paris",
            country: lang === "ar" ? "فرنسا" : "France",
            coordinates: [48.8566, 2.3522],
            price: "$599",
            image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400",
            description: lang === "ar" ? "مدينة الأنوار والرومانسية" : "City of Lights and Romance"
        },
        {
            id: 4,
            name: lang === "ar" ? "لندن" : "London",
            country: lang === "ar" ? "المملكة المتحدة" : "United Kingdom",
            coordinates: [51.5074, -0.1278],
            price: "$549",
            image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400",
            description: lang === "ar" ? "عاصمة الثقافة والتاريخ" : "Capital of Culture and History"
        },
        {
            id: 5,
            name: lang === "ar" ? "طوكيو" : "Tokyo",
            country: lang === "ar" ? "اليابان" : "Japan",
            coordinates: [35.6762, 139.6503],
            price: "$799",
            image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400",
            description: lang === "ar" ? "مزيج من التقليد والحداثة" : "Blend of Tradition and Modernity"
        },
        {
            id: 6,
            name: lang === "ar" ? "نيويورك" : "New York",
            country: lang === "ar" ? "الولايات المتحدة" : "USA",
            coordinates: [40.7128, -74.0060],
            price: "$699",
            image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400",
            description: lang === "ar" ? "المدينة التي لا تنام" : "The City That Never Sleeps"
        },
        {
            id: 7,
            name: lang === "ar" ? "اسطنبول" : "Istanbul",
            country: lang === "ar" ? "تركيا" : "Turkey",
            coordinates: [41.0082, 28.9784],
            price: "$349",
            image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=400",
            description: lang === "ar" ? "بوابة بين الشرق والغرب" : "Gateway Between East and West"
        },
        {
            id: 8,
            name: lang === "ar" ? "سنغافورة" : "Singapore",
            country: lang === "ar" ? "سنغافورة" : "Singapore",
            coordinates: [1.3521, 103.8198],
            price: "$499",
            image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=400",
            description: lang === "ar" ? "حديقة المدينة الآسيوية" : "Asia's Garden City"
        },
        {
            id: 9,
            name: lang === "ar" ? "برشلونة" : "Barcelona",
            country: lang === "ar" ? "إسبانيا" : "Spain",
            coordinates: [41.3851, 2.1734],
            price: "$529",
            image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=400",
            description: lang === "ar" ? "فن وثقافة على البحر المتوسط" : "Art and Culture on Mediterranean"
        },
        {
            id: 10,
            name: lang === "ar" ? "بانكوك" : "Bangkok",
            country: lang === "ar" ? "تايلاند" : "Thailand",
            coordinates: [13.7563, 100.5018],
            price: "$399",
            image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=400",
            description: lang === "ar" ? "عاصمة الابتسامات" : "Capital of Smiles"
        },
        {
            id: 11,
            name: lang === "ar" ? "الرياض" : "Riyadh",
            country: lang === "ar" ? "السعودية" : "Saudi Arabia",
            coordinates: [24.7136, 46.6753],
            price: "$279",
            image: "https://images.unsplash.com/photo-1586724237569-f3d0c1dee8c6?w=400",
            description: lang === "ar" ? "قلب الجزيرة العربية" : "Heart of Arabian Peninsula"
        },
        {
            id: 12,
            name: lang === "ar" ? "كوالالمبور" : "Kuala Lumpur",
            country: lang === "ar" ? "ماليزيا" : "Malaysia",
            coordinates: [3.1390, 101.6869],
            price: "$429",
            image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=400",
            description: lang === "ar" ? "مدينة البرجين التوأمين" : "City of Twin Towers"
        }
    ];

    useEffect(()=>{
        AOS.init({ duration: 1000 });
        const fetchData = async () => {
            dispatch(addSpinner());
            try{
                const response = await axios.get(`${import.meta.env.VITE_API_KEY}/api/topdests?locale=${lang}&populate=trip.image`);
                setData(response.data.data[0]);
            }catch(error){
                console.log(error);
                // Use mock data if API fails
                setData({ title: lang === "ar" ? "الوجهات الأكثر شعبية" : "Popular Destinations" });
            }finally{
                dispatch(removeSpinner());
                setLoading(false);
            }
        }
        fetchData();
    },[lang]);

    useEffect(() => {
        if (showMap) {
            setMapKey(prev => prev + 1);
        }
    }, [showMap]);

    // Handle explore destination
    const handleExploreDestination = (destination) => {
        setSelectedDestination(destination);
        setShowMap(true);
        // Scroll to map section
        setTimeout(() => {
            window.scrollTo({
                top: 400,
                behavior: 'smooth'
            });
        }, 100);
    };

   if(loading){
    return <Skelaton count={4} ok={true} width={24} />
   }

    return(
        <div className="w-full flex flex-col p-4 mt-20 overflow-x-hidden">
          {/* Header with Map Toggle */}
          <div className={`flex justify-between items-center mb-6 ${lang === "ar" ? "flex-row-reverse" : ""}`}>
            <div className={`${lang === "ar"? "text-right" : "text-left"} text-[32px] font-bold`}>
              {data?.title || (lang === "ar" ? "الوجهات الأكثر شعبية" : "Popular Destinations")}
            </div>
            <button
              onClick={() => setShowMap(!showMap)}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
            >
              <span>{showMap ? '📋' : '🗺️'}</span>
              <span>{showMap ? (lang === "ar" ? "عرض القائمة" : "Show List") : (lang === "ar" ? "عرض الخريطة" : "Show Map")}</span>
            </button>
          </div>

          {/* Map View */}
          {showMap && (
            <div className="mb-12" data-aos="fade-in">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <MapContainer
                  key={mapKey}
                  center={[25.2048, 55.2708]}
                  zoom={2}
                  style={{ height: '600px', width: '100%' }}
                  scrollWheelZoom={true}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <FlyToDestination destination={selectedDestination} markerRefs={markerRefs} />
                  {mockDestinations.map((destination) => (
                    <Marker 
                      key={destination.id} 
                      position={destination.coordinates}
                      ref={(ref) => {
                        if (ref) {
                          markerRefs.current[destination.id] = ref;
                        }
                      }}
                    >
                      <Popup>
                        <div className="text-center p-2 min-w-[200px]">
                          <img 
                            src={destination.image} 
                            alt={destination.name}
                            className="w-full h-32 object-cover rounded-lg mb-2"
                          />
                          <h3 className="font-bold text-lg text-slate-900 mb-1">{destination.name}</h3>
                          <p className="text-sm text-slate-600 mb-2">{destination.country}</p>
                          <p className="text-xs text-slate-700 mb-2">{destination.description}</p>
                          <div className="text-blue-600 font-bold text-lg">{destination.price}</div>
                          <button className="mt-2 w-full px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors">
                            {lang === "ar" ? "احجز الآن" : "Book Now"}
                          </button>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              </div>
              <p className="text-center text-slate-600 mt-4">
                {lang === "ar" 
                  ? "انقر على العلامات لرؤية تفاصيل الوجهة" 
                  : "Click on markers to see destination details"}
              </p>
            </div>
          )}

          {/* Grid View */}
          {!showMap && (
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {mockDestinations.map((destination, index) => (
                <div 
                  key={destination.id}
                  data-aos="fade-up"
                  data-aos-delay={index * 50}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={destination.image} 
                      alt={destination.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow-lg">
                      <span className="font-bold text-blue-600">{destination.price}</span>
                    </div>
                  </div>
                  <div className={`p-4 ${lang === "ar" ? "text-right" : "text-left"}`}>
                    <h3 className="text-xl font-bold text-slate-900 mb-1">{destination.name}</h3>
                    <p className="text-sm text-slate-600 mb-2">{destination.country}</p>
                    <p className="text-sm text-slate-700 mb-3">{destination.description}</p>
                    <button 
                      onClick={() => handleExploreDestination(destination)}
                      className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                    >
                      {lang === "ar" ? "استكشف الآن" : "Explore Now"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Legacy Flight Cards - only if data.trip exists */}
          {!showMap && data && data.trip && data.trip.length > 0 && (
            <div className="w-full flex flex-wrap justify-between gap-5 md:gap-0 xl:gap-0 mt-8">
              {data.trip.map((item, index)=>{
                return(
                  <FlightCard key={index} item={item}/>
                ) 
              })}
            </div>
          )}
        </div>
    );
}
export default Destinations;