import * as React from "react";
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



function Navbar() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [openmen, isOpen] = useState(false);
    const [scroll, setScroll] = useState(false);
    const [accor, setAccor] = useState(false);
    const lang = useSelector((state) => state.lang.lang);
    const token = useSelector((state) => state.auth.token);
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

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

    const handle = () => {
        dispatch(logout());
        handleClose();
    }



    return (
        <nav className={`w-full z-50 fixed px-4 ${scroll ? "bg-slate-700" : "bg-none"} ${window.location.pathname !== '/' ? "bg-slate-700" : ""} py-4 flex justify-between items-center shadow-3 transition-all duration-300`}>
            <div className="w-52">
                <img src={logo} alt="Flyza Airways Logo" />
            </div>
            <div className="hidden md:flex items-center gap-4 text-white">
                {data?.menu_items?.map((item) => (
                    <a key={item.id} href={item.src}>{item.title}</a>
                ))}
                {
                    token ? <div>
                        <div
                            className="font-bold cursor-pointer"
                            id="demo-positioned-button"
                            aria-controls={open ? 'demo-positioned-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                        >
                            Welcome {user.username} !!
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
                            <MenuItem onClick={handleClose}>Profile</MenuItem>
                            <MenuItem onClick={() => handle()} >Logout</MenuItem>
                        </Menu>
                    </div> : <div className="flex gap-4"><Register /> <Login /></div>

                }


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
                {
                    token ? <div className="w-[50%]">
                        <div onClick={() => setAccor(!accor)}>Welcome {user.username} !!</div>
                        <div className={`${accor ? "max-h-screen" : "max-h-0"} bg-slate-50 transition-all duration-500`}>
                            <div className={`${accor ? "opacity-100" : "opacity-0"} transition-all duration-500 text-black text-center`} onClick={() => dispatch(logout())}>Logout</div>
                        </div>

                    </div> : <div className="flex flex-col gap-4"><Register /> <Login /></div>

                }

                <div onClick={() => dispatch(setLang(lang === "en" ? "ar" : "en"))}>
                    {lang === "en" ? "ar" : "en"}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
