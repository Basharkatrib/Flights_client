import { useEffect, useState } from "react";
import axios from 'axios';
import logo from '../../assets/images/Flyza.svg';
import { useDispatch, useSelector } from "react-redux";
import { setLang } from "../../store/langSlice";
function Navbar() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [open, isOpen] = useState(false);
    const [scroll, setScroll] = useState(false);
    const lang = useSelector(state => state.lang.lang);
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

    const changeColor = ()=>{
        if(window.scrollY >= 90){
            setScroll(true)
        }else{
            setScroll(false)
        }
    }
    
    window.addEventListener('scroll', changeColor)
    

    if (loading) {
        return <div>Loading...</div>;
    }


    return (
        <nav className={`w-full z-50 fixed px-4 ${scroll ? "bg-slate-700" : "bg-none"} py-4 flex justify-between items-center shadow-3 transition-all duration-300`}>
            <div className=" w-52">
                <img src={logo} alt="Flyza Airways Logo" />
            </div>
            <div className="hidden md:flex items-center gap-4 text-white">
                {
                    data && data.menu_items && data.menu_items.map((item) => {
                        return <a key={item.id} href={item.src}>{item.title}</a>;
                    })
                }
                {
                    data && data.buttons && data.buttons.map((item) => {
                        return <a className="bg-[#D9D9D9] px-5 py-1 rounded-xl" key={item.id} href={item.src}>{item.title}</a>;
                    })
                }
                {lang === "en" ? <div className="cursor-pointer" onClick={() => dispatch(setLang('ar'))}>ar</div> : <div className="cursor-pointer" onClick={() => dispatch(setLang('en'))}>en</div>}
            </div>
            <div onClick={() => isOpen(!open)} className="flex h-10 flex-col gap-[6px] md:hidden  p-2 rounded-md">
                <div className={`bg-white w-7 h-[2px] ${open ? " transform  translate-y-1 rotate-[45deg]" : " rotate-0"} transition-all duration-500`}></div>
                <div className={`bg-white w-7 h-[2px] ${open ? " hidden" : " block"} transition-all duration-300`}></div>
                <div className={`bg-white w-7 h-[2px] ${open ? " transform -translate-y-[3px] rotate-[-45deg] " : " rotate-0"} transition-all duration-500`}></div>
            </div>
            
            <div className={`flex flex-col text-white md:hidden items-center gap-4 p-3 absolute ${scroll ? "bg-slate-700" : "bg-none"} w-[90%] h-auto top-20 left-1/2 ${open ? 'transform -translate-x-1/2' : 'transform translate-x-full'}  transition-all duration-500 rounded-xl shadow-3`}>
                {
                    data && data.menu_items && data.menu_items.map((item) => {
                        return <a key={item.id} href={item.src}>{item.title}</a>;
                    })
                }
                {
                    data && data.buttons && data.buttons.map((item) => {
                        return <a className="bg-[#D9D9D9] text-black px-5 py-1 rounded-xl" key={item.id} href={item.src}>{item.title}</a>;
                    })
                }
                {lang === "en" ? <div  onClick={() => dispatch(setLang('ar'))}>ar</div> : <div onClick={() => dispatch(setLang('en'))}>en</div>}
            </div>

        </nav>
    );
}
export default Navbar;