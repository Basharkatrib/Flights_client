import banner from '../../assets/images/banner.jpg'
import button from '../../assets/images/Frame.svg'
import { useTranslation } from 'react-i18next';
import { useSelector } from "react-redux";
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import arrow from '../../assets/images/arrowright.svg';
import { motion } from "motion/react";
import AOS from "aos";
import "aos/dist/aos.css";

function Banner() {
    const lang = useSelector(state => state.lang.lang);
    const { t, i18n } = useTranslation();

    useEffect(() => {
        i18n.changeLanguage(lang);
    }, [lang]);

    useEffect(() => {
        AOS.init({
            duration: 3000
        });
    }, [lang]);


    return (
        <div className=' h-[568px] w-full relative'>
            <img className='h-full w-full object-cover' src={banner} />
            <div  className={`absolute w-[80%] -bottom-12 left-1/2 gap-3 -translate-x-1/2 rounded-md flex flex-col  ${lang === "ar" ? "md:flex-row-reverse" : "md:flex-row"}  items-center bg-[#EEEEEE] p-3`}>
                <div data-aos="fade-up" className={`w-full md:basis-1/4 ${lang === "ar" ? "text-right border-l-2" : "text-left border-r-2"} border-neutral-400`}>
                    <p className='text-[16px] text-neutral-400'>{t('Discover')}</p>
                    <h3 className='text-[20px] font-bold'>{t('Choose Departure City')}</h3>
                </div>
                <div data-aos="fade-up" className={`w-full md:basis-1/4 ${lang === "ar" ? "text-right border-l-2" : "text-left border-r-2"} border-neutral-400`}>
                    <p className='text-[16px] text-neutral-400'>{t('Select')}</p>
                    <h3 className='text-[20px] font-bold'>{t('Select Arrival City')}</h3>
                </div>
                <div data-aos="fade-up" className={`w-full md:basis-1/4 ${lang === "ar" ? "text-right border-l-2" : "text-left border-r-2"} border-neutral-400`}>
                    <p className='text-[16px] text-neutral-400'>{t('Choose')}</p>
                    <h3 className='text-[20px] font-bold'>{t('Departure Date')}</h3>
                </div>
                <div data-aos="fade-up" className={`w-full md:basis-1/4 ${lang === "ar" ? "text-right" : "text-left"}`}>
                    <p className='text-[16px] text-neutral-400'>{t('Choose')}</p>
                    <h3 lassName='text-[20px] font-bold'>{t('Return Date')}</h3>
                </div>
                <div className='flex gap-5'>
                <motion.svg  animate={{ x: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }} className='w-14' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#334155" d="M480 96c17.7 0 32 14.3 32 32s-14.3 32-32 32l-208 0 0-64 208 0zM320 288c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l64 0zm64-64c0 17.7-14.3 32-32 32l-48 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l48 0c17.7 0 32 14.3 32 32zM288 384c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l64 0zm-88-96l.6 0c-5.4 9.4-8.6 20.3-8.6 32c0 13.2 4 25.4 10.8 35.6C177.9 364.3 160 388.1 160 416c0 11.7 3.1 22.6 8.6 32l-8.6 0C71.6 448 0 376.4 0 288l0-61.7c0-42.4 16.9-83.1 46.9-113.1l11.6-11.6C82.5 77.5 115.1 64 149 64l27 0c35.3 0 64 28.7 64 64l0 88c0 22.1-17.9 40-40 40s-40-17.9-40-40l0-56c0-8.8-7.2-16-16-16s-16 7.2-16 16l0 56c0 39.8 32.2 72 72 72z"/></motion.svg>
                {/* <Link to="/mytrips"><img
                    className='bg-slate-700 p-4 rounded-md' src={arrow} /></Link> */}
                    <Link className='w-24 flex justify-center items-center' to="/mytrips"><div className='p-1 flex items-center h-full  rounded-md text-[14px] bg-slate-700 text-white font-bold'>View Flights</div></Link>
                    </div>
            </div>
        </div>
    );
}
export default Banner;