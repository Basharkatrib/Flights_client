import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useTranslation } from "react-i18next";

function BookedTrips() {
    const { t, i18n } = useTranslation();
    const lang = useSelector(state => state.lang.lang);
    const auth = useSelector((state) => state.auth.user);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        i18n.changeLanguage(lang);
    }, [lang]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_KEY}/api/orders?populate=flight`);
                const data = res.data.data || [];
                const mine = data.filter(o => {
                    const u = o?.user || o?.attributes?.user;
                    const userId = u?.id || u?.data?.id;
                    return auth && auth.id && userId === auth.id;
                });
                setOrders(mine);
            } catch (e) {
                console.log(e);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, [auth]);

    if (loading) return <div className="pt-24 px-4">Loading...</div>;

    return (
        <div className={`w-full flex flex-col pt-20 pb-8 ${lang === "ar" ? 'text-right' : 'text-left'} px-4`}> 
            <div className="max-w-6xl w-full mx-auto">
                <div className="font-bold text-[22px] md:text-[26px] mb-4">{t('My Trips')}</div>
                {orders.length === 0 ? (
                    <div className="bg-slate-50 border border-dashed border-slate-300 p-4 rounded-md text-slate-600">{t('no_results')}</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {orders.map((o) => {
                            const f = o.flight || o.attributes?.flight;
                            const flightData = f?.data || f || {};
                            const item = flightData?.attributes || flightData;
                            return (
                                <div key={o.id} className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm">
                                    <div className="font-bold text-lg mb-2">{item?.departure_airport} → {item?.arrival_airport}</div>
                                    <div className="text-sm text-slate-600">{t('Departure Time :')} {item?.departure_time}</div>
                                    <div className="text-sm text-slate-600">{t('Arrival Time :')} {item?.arrival_time}</div>
                                    <div className="text-sm text-slate-600">{t('Price per Person :')} {item?.price}</div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}

export default BookedTrips;


