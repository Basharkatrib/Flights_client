import * as React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import logo from "../../assets/images/Flyza.svg";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { AccessAlarm, ThreeDRotation } from '@mui/icons-material';
import { useDispatch, useSelector } from "react-redux";
import { setLang } from "../../store/langSlice";
import Register from "../Register/Register";
import Login from "../Login/Login";
import { logout } from "../../store/authSlice";
import { useTranslation } from 'react-i18next';



function Navbar({ ok, handlee }) {
    const [data, setData] = useState(null);
    // const [loading, setLoading] = useState(true);
    const [openmen, isOpen] = useState(false);
    const [scroll, setScroll] = useState(false);
    const [accor, setAccor] = useState(false);
    const lang = useSelector((state) => state.lang.lang);
    const token = useSelector((state) => state.auth.token);
    const user = useSelector((state) => state.auth.user);
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await axios.get(`${import.meta.env.VITE_API_KEY}/api/navbars?locale=${lang}`);
    //             setData(response.data.data[0]);
    //         } catch (error) {
    //             console.log(error);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };
    //     fetchData();
    // }, [lang]);


    useEffect(() => {
        i18n.changeLanguage(lang);
    }, [lang]);

    useEffect(() => {
        const changeColor = () => {
            setScroll(window.scrollY >= 90);
        };
        window.addEventListener("scroll", changeColor);
        return () => window.removeEventListener("scroll", changeColor);
    }, []);



    // if (loading) {
    //     return <div>Loading...</div>;
    // }

    const handle = () => {
        dispatch(logout());
        handleClose();
    }

    const handleMenu = () => {
        isOpen(!openmen);
        setAccor(false);
    }



    return (
        <nav className={`w-full z-50 fixed px-4 ${scroll ? "bg-slate-700" : "bg-none"} ${window.location.pathname !== '/' ? "bg-slate-700" : ""} py-4 flex ${lang === "ar" ? "flex-row-reverse" : "flex-row"} justify-between items-center shadow-3 transition-all duration-300`}>
            <Link to="/" className="w-52">
                <img src={logo} alt="Flyza Airways Logo" />
            </Link>
            <div className={`hidden md:flex ${lang === "ar" ? "flex-row-reverse" : "flex-row"} items-center gap-4 text-white`}>
                <Link to="/about" className="hover:text-blue-300 transition-colors">{t('About')}</Link>
                <Link to="/contact" className="hover:text-blue-300 transition-colors">{t('Contact')}</Link>
                <Link to="/booked" className="hover:text-blue-300 transition-colors">{t('My Trips')}</Link>

                {
                    token ? <div>
                        <div
                            className="font-bold flex gap-2 cursor-pointer text-left"
                            id="demo-positioned-button"
                            aria-controls={open ? 'demo-positioned-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                        >
                            {lang === "en"
                                ? `${t('Welcome')} ${user.username} !!`
                                : `!! ${t('Welcome')} ${user.username}`}
                                <svg className={`w-3 transition-all duration-500 ${open ? 'transform rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="#ffffff" d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z"/></svg>

                        </div>
                        <Menu
                            id="demo-positioned-menu"
                            aria-labelledby="demo-positioned-button"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                        >
                            <MenuItem onClick={handleClose}><Link to="/profile">{t('Profile')}</Link></MenuItem>
                            <MenuItem onClick={() => handle()} >{t('Logout')}</MenuItem>
                        </Menu>
                    </div> : <div className="flex gap-4"><Register /> <Login ok={ok} handlee={handlee} /></div>

                }


                <div className="cursor-pointer" onClick={() => dispatch(setLang(lang === "en" ? "ar" : "en"))}>
                    {lang === "en" ? "Ar" : "En"}
                </div>
            </div>

            <div onClick={() => handleMenu()} className="flex h-10 flex-col cursor-pointer gap-[6px] md:hidden p-2 rounded-md">
                <div className={`bg-white w-7 h-[2px] transition-all duration-500 ${openmen ? "transform translate-y-1 rotate-[45deg]" : "rotate-0"}`} />
                <div className={`bg-white w-7 h-[2px] transition-all duration-300 ${openmen ? "hidden" : "block"}`} />
                <div className={`bg-white w-7 h-[2px] transition-all duration-500 ${openmen ? "transform -translate-y-[3px] rotate-[-45deg]" : "rotate-0"}`} />
            </div>

            <div className={`flex flex-col text-white md:hidden items-center gap-4 p-3 absolute bg-slate-700 w-[90%] h-auto top-20 left-1/2 ${openmen ? "transform -translate-x-1/2" : "transform translate-x-full"} transition-all duration-500 rounded-xl shadow-3`}>
                <Link className="text-[17px]" to="/about" onClick={() => setOpenmen(false)}>{t('About')}</Link>
                <Link className="text-[17px]" to="/contact" onClick={() => setOpenmen(false)}>{t('Contact')}</Link>
                <Link className="text-[17px]" to="/booked" onClick={() => setOpenmen(false)}>{t('My Trips')}</Link>
                {
                    token ? <div className="w-full">
                        <div className="text-center cursor-pointer flex justify-center gap-2 text-[17px]" onClick={() => setAccor(!accor)}> {lang === "en"
                            ? `${t('Welcome')} ${user.username} !!`
                            : `!! ${t('Welcome')} ${user.username}`}
                            <svg className={`w-3 transition-all duration-500 ${accor ? 'transform rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="#ffffff" d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z"/></svg>
                            </div>
                        <div className={`${accor ? "max-h-screen" : "max-h-0"} bg-slate-50  transition-all duration-500`}>
                            <Link to="/profile" className={`${accor ? "opacity-100 block" : "opacity-0 hidden"} py-2 transition-all duration-500 text-black text-center text-[17px] border-b border-slate-300`} onClick={() => { setOpenmen(false); setAccor(false); }}>{t('Profile')}</Link>
                            <div className={`${accor ? "opacity-100 block" : "opacity-0 hidden"} py-2 transition-all duration-500 text-black text-center text-[17px]`} onClick={() => dispatch(logout())}>{t('Logout')}</div>
                        </div>

                    </div> : <div className="flex flex-col gap-4"><Register /> <Login /></div>
                }
                <div className="cursor-pointer" onClick={() => dispatch(setLang(lang === "en" ? "ar" : "en"))}>
                    {lang === "en" ? "Ar" : "En"}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
