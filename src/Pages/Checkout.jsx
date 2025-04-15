import { useEffect, useState } from "react";
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

    useEffect(() => {
        const storedItems = JSON.parse(localStorage.getItem("searchData"));
        if (storedItems) {
            const count = Number(storedItems.passengers);
            setPassengerCount(count ? count : 1);
            const total = count * (flight?.[0]?.price || 0);
            setAllPrice(total);
            localStorage.setItem("Allprice", JSON.stringify(total));
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
            navigate('/');
        }catch(error){
            console.log(error)
        }
      };

    return (
        <div className={`w-full flex flex-col pt-20 pb-7 ${lang === "ar" ? 'text-right' : 'text-left'} px-4`}>
            <div className="font-bold text-[25px] mb-3">
                {t('Flight Reservation')}
            </div>
            <div className={`w-full flex flex-col ${lang === "ar" ? 'md:flex-row-reverse' : 'md:flex-row'}  gap-5`}>
                <div className="flex flex-col basis-2/5">
                    <form onSubmit={formik.handleSubmit}>
                        <div className="bg-slate-700 text-white font-bold p-3 rounded-t-md">
                            {t('Passengers Details')}
                        </div>
                        <div className="bg-[#EEEEEE] px-3 py-2">
                            {formik.values.passengers.map((passenger, index) => (
                                <div key={index} className="flex flex-col gap-2 mb-5">
                                    <div className="font-bold">{t('Passenger')} {index + 1}</div>
                                    <input
                                        name={`passengers[${index}].name`}
                                        type="text"
                                        placeholder={t('Full name')}
                                        className={`p-1 ${lang === "ar" ? 'text-right' : 'text-left'} outline-none border border-blue-950 rounded-md`}
                                        value={formik.values.passengers[index].name}
                                        onChange={formik.handleChange}
                                    />
                                    {formik.errors.passengers?.[index]?.name && (
                                        <div className="text-red-500 text-sm">
                                            {formik.errors.passengers[index].name}
                                        </div>
                                    )}

                                    <input
                                        name={`passengers[${index}].date`}
                                        type="date"
                                        className={`p-1 ${lang === "ar" ? 'text-right' : 'text-left'} outline-none border border-blue-950 rounded-md`}
                                        value={formik.values.passengers[index].date}
                                        onChange={formik.handleChange}
                                    />
                                    {formik.errors.passengers?.[index]?.date && (
                                        <div className="text-red-500 text-sm">
                                            {formik.errors.passengers[index].date}
                                        </div>
                                    )}
                                </div>
                            ))}
                            {
                                completed ? (
                                    <button
                                        type="submit"
                                        className=" bg-green-700 font-bold text-white px-4 py-2 rounded hover:bg-green-500 w-full transition-all duration-300"
                                    >
                                        {t('Completed')}
                                    </button>
                                ) : (<button
                                    type="submit"
                                    className="bg-slate-700 font-bold text-white px-4 py-2 rounded hover:bg-slate-600 w-full transition-all duration-300"
                                >
                                    {t('Save')}
                                </button>)
                            }

                        </div>
                    </form>
                </div>

                <div className="flex flex-col basis-3/5 gap-3">
                    <div className={`w-full flex ${lang === "ar" ? 'flex-row-reverse' : ''} justify-between`}>
                        <div className="font-bold">{t('Departure Airport :')}</div>
                        <div>{flight[0]?.departure_airport}</div>
                    </div>
                    <div className={`w-full flex ${lang === "ar" ? 'flex-row-reverse' : ''} justify-between`}>
                        <div className="font-bold">{t('Departure Terminal :')}</div>
                        <div>{flight[0]?.departure_terminal}</div>
                    </div>
                    <div className={`w-full flex ${lang === "ar" ? 'flex-row-reverse' : ''} justify-between`}>
                        <div className="font-bold">{t('Departure Time :')}</div>
                        <div>{flight[0]?.departure_time}</div>
                    </div>
                    <hr />
                    <div className={`w-full flex ${lang === "ar" ? 'flex-row-reverse' : ''} justify-between`}>
                        <div className="font-bold">{t('Arrival Airport :')}</div>
                        <div>{flight[0]?.arrival_airport}</div>
                    </div>
                    <div className={`w-full flex ${lang === "ar" ? 'flex-row-reverse' : ''} justify-between`}>
                        <div className="font-bold">{t('Arrival Terminal :')}</div>
                        <div>{flight[0]?.arrival_terminal}</div>
                    </div>
                    <div className={`w-full flex ${lang === "ar" ? 'flex-row-reverse' : ''} justify-between`}>
                        <div className="font-bold">{t('Arrival Time :')}</div>
                        <div>{flight[0]?.arrival_time}</div>
                    </div>
                    <hr />
                    <div className={`w-full flex ${lang === "ar" ? 'flex-row-reverse' : ''} justify-between`}>
                        <div className="font-bold">{t('Passengers :')}</div>
                        <div>{passengerCount ? passengerCount : 1}</div>
                    </div>
                    <div className={`w-full flex ${lang === "ar" ? 'flex-row-reverse' : ''} justify-between`}>
                        <div className="font-bold">{t('Stops :')}</div>
                        <div>{flight[0]?.stops}</div>
                    </div>
                    <div className={`w-full flex ${lang === "ar" ? 'flex-row-reverse' : ''} justify-between`}>
                        <div className="font-bold">{t('Price per Person :')}</div>
                        <div>{flight[0]?.price}</div>
                    </div>
                    <div className={`w-full flex ${lang === "ar" ? 'flex-row-reverse' : ''} justify-between`}>
                        <div className="font-bold">{t('Total Price :')}</div>
                        <div>{allprice ? allprice : flight[0]?.price}</div>
                    </div>
                    {pay && <button className="w-full mb-3">
                        <PayPalScriptProvider
                            options={{
                                "client-id": "ATIzfGbQ6tjutpRZ4PBZC-2lMC1JjcKbw7Lmag_Xil2Hlwpc5_fN_eHlVVeQZZVpZON2NmcJ1ZbKGby7", // Replace with your actual PayPal Client ID
                                currency: "USD", // Adjust the currency code as needed
                            }}
                        >
                            <PayPalButtons
                                createOrder={(data, actions) => {
                                    return actions.order.create({
                                        purchase_units: [
                                            {
                                                amount: {
                                                    value: allprice ? allprice : flight[0]?.price,
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
    );
}

export default Checkout;
