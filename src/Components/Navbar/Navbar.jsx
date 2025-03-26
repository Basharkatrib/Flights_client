import * as React from "react";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import logo from "../../assets/images/Flyza.svg";
import { useDispatch, useSelector } from "react-redux";
import { setLang } from "../../store/langSlice";
import Register from "../Register/Register";
import Login from "../Login/Login";

function Navbar() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [openmen, isOpen] = useState(false);
    const [scroll, setScroll] = useState(false);

    const lang = useSelector((state) => state.lang.lang);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_KEY}/api/navbars?locale=${lang}`);
                setData(response.data.data[0]);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [lang]);

    useEffect(() => {
        const changeColor = () => {
            setScroll(window.scrollY >= 90);
        };
        window.addEventListener("scroll", changeColor);
        return () => window.removeEventListener("scroll", changeColor);
    }, []);


    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <nav className={`w-full z-50 fixed px-4 ${scroll ? "bg-slate-700" : "bg-none"} py-4 flex justify-between items-center shadow-3 transition-all duration-300`}>
            <div className="w-52">
                <img src={logo} alt="Flyza Airways Logo" />
            </div>
            <div className="hidden md:flex items-center gap-4 text-white">
                {data?.menu_items?.map((item) => (
                    <a key={item.id} href={item.src}>{item.title}</a>
                ))}
                <Register />
                <Login />
                <div className="cursor-pointer" onClick={() => dispatch(setLang(lang === "en" ? "ar" : "en"))}>
                    {lang === "en" ? "ar" : "en"}
                </div>
            </div>

            <div onClick={() => isOpen(!openmen)} className="flex h-10 flex-col gap-[6px] md:hidden p-2 rounded-md">
                <div className={`bg-white w-7 h-[2px] transition-all duration-500 ${openmen ? "transform translate-y-1 rotate-[45deg]" : "rotate-0"}`} />
                <div className={`bg-white w-7 h-[2px] transition-all duration-300 ${openmen ? "hidden" : "block"}`} />
                <div className={`bg-white w-7 h-[2px] transition-all duration-500 ${openmen ? "transform -translate-y-[3px] rotate-[-45deg]" : "rotate-0"}`} />
            </div>

            <div className={`flex flex-col text-white md:hidden items-center gap-4 p-3 absolute ${scroll ? "bg-slate-700" : "bg-none"} w-[90%] h-auto top-20 left-1/2 ${openmen ? "transform -translate-x-1/2" : "transform translate-x-full"} transition-all duration-500 rounded-xl shadow-3`}>
                {data?.menu_items?.map((item) => (
                    <a key={item.id} href={item.src}>{item.title}</a>
                ))}
                    <Register />
                    <Login />
              
                <div onClick={() => dispatch(setLang(lang === "en" ? "ar" : "en"))}>
                    {lang === "en" ? "ar" : "en"}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
