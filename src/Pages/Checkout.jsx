import { useEffect, useState, useMemo } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useTranslation } from 'react-i18next';
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Checkout() {
    const [passengerCount, setPassengerCount] = useState(1);
    const [pay, setPay] = useState(false);
    const lang = useSelector(state => state.lang.lang);
    const [completed, setCompleted] = useState(false);
    const flight = useSelector((state) => state.flightselect.selectedFlight);
    const newId = useSelector((state) => state.newId.id)
    const auth = useSelector((state) => state.auth.user);
    const { t, i18n } = useTranslation();
    const [allprice, setAllPrice] = useState();
    const navigate = useNavigate();
    const [canAdjustPassengers, setCanAdjustPassengers] = useState(false);

    useEffect(() => {
        const storedItems = JSON.parse(localStorage.getItem("searchData"));
        if (storedItems) {
            const count = Number(storedItems.passengers);
            if (count && count > 0) {
                setPassengerCount(count);
                setCanAdjustPassengers(false);
                const total = count * ((flight && flight[0] && flight[0].price) || 0);
                setAllPrice(total);
                localStorage.setItem("Allprice", JSON.stringify(total));
            } else {
                setCanAdjustPassengers(true);
                const initialTotal = 1 * ((flight && flight[0] && flight[0].price) || 0);
                setAllPrice(initialTotal);
                localStorage.setItem("Allprice", JSON.stringify(initialTotal));
            }
        } else {
            setCanAdjustPassengers(true);
            const initialTotal = 1 * ((flight && flight[0] && flight[0].price) || 0);
            setAllPrice(initialTotal);
            localStorage.setItem("Allprice", JSON.stringify(initialTotal));
        }
    }, [flight]);

    useEffect(() => {
            i18n.changeLanguage(lang);
        }, [lang]);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            passengers: Array.from({ length: passengerCount }, () => ({
                name: "",
                date: "",
            })),
        },
        validationSchema: Yup.object({
            passengers: Yup.array().of(
                Yup.object().shape({
                    name: Yup.string().required("Name is required"),
                    date: Yup.date().required("Date of birth is required"),
                })
            ),
        }),
        onSubmit: (values) => {
            localStorage.setItem("passengersData", JSON.stringify(values.passengers));
            toast.success('Successfully saved!')
            setPay(true);
            setCompleted(true);
        },
    });

    useEffect(()=>{
        console.log(newId)
    },[])

    const handlePaymentError = (error) => {
        toast.error("Unexpected error!")
      };

      const handlePaymentSuccess = async () => {
        try{
           const res = await axios.post('https://flights-server.onrender.com/api/orders',{
                "data":
                    {
                        "user": {
                            "id": auth.id
                        },
                        "flight": {
                            "id": newId
                        },
                        "state" : true
                    }
            });
            toast.success('Payment Successful');
            navigate('/tickets');
        }catch(error){
            console.log(error)
        }
      };

    const currencyFormatter = useMemo(() => new Intl.NumberFormat(lang === 'ar' ? 'ar-EG' : 'en-US', { style: 'currency', currency: 'USD' }), [lang]);

    const pricePerPerson = (flight && flight[0] && flight[0].price) || 0;
    const totalPrice = allprice != null ? allprice : pricePerPerson;
    const availableSeats = (flight && flight[0] && flight[0].available_seats) || 1;

    useEffect(() => {
        // Recalculate total whenever passengerCount or price changes
        const total = Number(passengerCount) * Number(pricePerPerson || 0);
        setAllPrice(total);
        localStorage.setItem("Allprice", JSON.stringify(total));
    }, [passengerCount, pricePerPerson]);

    const incPassengers = () => {
        if (passengerCount < availableSeats) {
            setPassengerCount(prev => prev + 1);
        } else {
            toast.error(t('not_enough_seats'));
        }
    };

    const decPassengers = () => {
        setPassengerCount(prev => Math.max(1, prev - 1));
    };

    return (
        <div className={`w-full flex flex-col pt-20 pb-8 ${lang === "ar" ? 'text-right' : 'text-left'} px-4`}> 
            <Toaster />
            <div className="max-w-6xl w-full mx-auto">
                <div className="font-bold text-[22px] md:text-[26px] mb-4">
                    {t('Flight Reservation')}
                </div>
                <div className={`grid grid-cols-1 md:grid-cols-5 gap-5`}>
                    <div className="md:col-span-3">
                        <form onSubmit={formik.handleSubmit} className="w-full">
                            <div className="bg-slate-700 text-white font-bold p-3 rounded-t-md">
                                {t('Passengers Details')}
                            </div>
                            <div className="bg-[#F5F7FA] px-3 py-3 rounded-b-md border border-slate-200">
                            {canAdjustPassengers && (
                                <div className={`w-full mb-3 flex items-center justify-between ${lang === "ar" ? 'flex-row-reverse' : ''}`}>
                                    <div className="text-sm text-slate-600 font-semibold">{t('Passengers')}:</div>
                                    <div className="flex items-center gap-2">
                                        <button type="button" onClick={decPassengers} className="px-2 py-1 rounded-md border border-slate-300 bg-white hover:border-slate-500">-</button>
                                        <div className="min-w-8 text-center font-bold">{passengerCount}</div>
                                        <button type="button" onClick={incPassengers} className="px-2 py-1 rounded-md border border-slate-300 bg-white hover:border-slate-500">+</button>
                                    </div>
                                </div>
                            )}
                            {formik.values.passengers.map((passenger, index) => (
                                <div key={index} className="flex flex-col gap-2 mb-5">
                                    <div className="font-bold">{t('Passenger')} {index + 1}</div>
                                    <input
                                        name={`passengers[${index}].name`}
                                        type="text"
                                        placeholder={t('Full name')}
                                        className={`p-2 ${lang === "ar" ? 'text-right' : 'text-left'} outline-none border border-slate-300 rounded-md bg-white focus:ring-2 focus:ring-slate-300 transition`}
                                        value={formik.values.passengers[index].name}
                                        onChange={formik.handleChange}
                                    />
                                    {formik.errors.passengers?.[index]?.name && (
                                        <div className="text-red-500 text-xs">
                                            {formik.errors.passengers[index].name}
                                        </div>
                                    )}

                                    <input
                                        name={`passengers[${index}].date`}
                                        type="date"
                                        className={`p-2 ${lang === "ar" ? 'text-right' : 'text-left'} w-full outline-none border border-slate-300 rounded-md bg-white focus:ring-2 focus:ring-slate-300 transition`}
                                        value={formik.values.passengers[index].date}
                                        onChange={formik.handleChange}
                                    />
                                    {formik.errors.passengers?.[index]?.date && (
                                        <div className="text-red-500 text-xs">
                                            {formik.errors.passengers[index].date}
                                        </div>
                                    )}
                                </div>
                            ))}
                            {
                                completed ? (
                                    <button
                                        type="submit"
                                        className=" bg-green-700 font-bold text-white px-4 py-2 rounded hover:bg-green-600 w-full transition-all duration-200 shadow"
                                    >
                                        {t('Completed')}
                                    </button>
                                ) : (<button
                                    type="submit"
                                        className="bg-slate-700 font-bold text-white px-4 py-2 rounded hover:bg-slate-800 w-full transition-all duration-200 shadow"
                                >
                                    {t('Save')}
                                </button>)
                            }

                            </div>
                        </form>
                    </div>

                    <div className="md:col-span-2">
                        <div className="sticky top-20">
                            <div className="bg-white border border-slate-200 rounded-md p-4 shadow-sm">
                                <div className={`w-full flex ${lang === "ar" ? 'flex-row-reverse' : ''} justify-between`}>
                                    <div className="font-bold">{t('Departure Airport :')}</div>
                                    <div>{(flight && flight[0] && flight[0].departure_airport) || '-'}</div>
                                </div>
                                <div className={`w-full flex ${lang === "ar" ? 'flex-row-reverse' : ''} justify-between`}>
                                    <div className="font-bold">{t('Departure Terminal :')}</div>
                                    <div>{(flight && flight[0] && flight[0].departure_terminal) || '-'}</div>
                                </div>
                                <div className={`w-full flex ${lang === "ar" ? 'flex-row-reverse' : ''} justify-between`}>
                                    <div className="font-bold">{t('Departure Time :')}</div>
                                    <div>{(flight && flight[0] && flight[0].departure_time) || '-'}</div>
                                </div>
                                <hr className="my-2" />
                                <div className={`w-full flex ${lang === "ar" ? 'flex-row-reverse' : ''} justify-between`}>
                                    <div className="font-bold">{t('Arrival Airport :')}</div>
                                    <div>{(flight && flight[0] && flight[0].arrival_airport) || '-'}</div>
                                </div>
                                <div className={`w-full flex ${lang === "ar" ? 'flex-row-reverse' : ''} justify-between`}>
                                    <div className="font-bold">{t('Arrival Terminal :')}</div>
                                    <div>{(flight && flight[0] && flight[0].arrival_terminal) || '-'}</div>
                                </div>
                                <div className={`w-full flex ${lang === "ar" ? 'flex-row-reverse' : ''} justify-between`}>
                                    <div className="font-bold">{t('Arrival Time :')}</div>
                                    <div>{(flight && flight[0] && flight[0].arrival_time) || '-'}</div>
                                </div>
                                <hr className="my-2" />
                                <div className={`w-full flex ${lang === "ar" ? 'flex-row-reverse' : ''} justify-between`}>
                                    <div className="font-bold">{t('Passengers :')}</div>
                                    <div>{passengerCount ? passengerCount : 1}</div>
                                </div>
                                <div className={`w-full flex ${lang === "ar" ? 'flex-row-reverse' : ''} justify-between`}>
                                    <div className="font-bold">{t('Stops :')}</div>
                                    <div>{(flight && flight[0] && flight[0].stops) || 0}</div>
                                </div>
                                <div className={`w-full flex ${lang === "ar" ? 'flex-row-reverse' : ''} justify-between`}>
                                    <div className="font-bold">{t('Price per Person :')}</div>
                                    <div>{currencyFormatter.format(pricePerPerson)}</div>
                                </div>
                                <div className={`w-full flex ${lang === "ar" ? 'flex-row-reverse' : ''} justify-between`}>
                                    <div className="font-bold">{t('Total Price :')}</div>
                                    <div>{currencyFormatter.format(totalPrice)}</div>
                                </div>
                                {pay && <button className="w-full mt-3">
                                    <PayPalScriptProvider
                                        options={{
                                            "client-id": "ATIzfGbQ6tjutpRZ4PBZC-2lMC1JjcKbw7Lmag_Xil2Hlwpc5_fN_eHlVVeQZZVpZON2NmcJ1ZbKGby7",
                                            currency: "USD",
                                        }}
                                    >
                                        <PayPalButtons
                                            createOrder={(data, actions) => {
                                                return actions.order.create({
                                                    purchase_units: [
                                                        {
                                                            amount: {
                                                                value: String(totalPrice || 0),
                                                            },
                                                        },
                                                    ],
                                                });
                                            }}
                                            onApprove={handlePaymentSuccess}
                                            onError={handlePaymentError}
                                        />
                                    </PayPalScriptProvider>
                                </button>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Checkout;
