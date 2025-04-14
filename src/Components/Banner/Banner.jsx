import banner from '../../assets/images/banner.jpg'
import button from '../../assets/images/Frame.svg'
import { useTranslation } from 'react-i18next';
import { useSelector } from "react-redux";
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import arrow from '../../assets/images/arrowright.svg';
import { motion } from "motion/react"

function Banner() {
    const lang = useSelector(state => state.lang.lang);
    const { t, i18n } = useTranslation();

    useEffect(() => {
        i18n.changeLanguage(lang);
    }, [lang]);


    return (
        <div className=' h-[568px] w-full relative'>
            <img className='h-full w-full object-cover' src={banner} />
            <div className='absolute w-[80%] -bottom-12 left-1/2 gap-3 -translate-x-1/2 rounded-md flex flex-col md:flex-row items-center bg-[#EEEEEE] p-3'>
                <div className='w-full md:basis-1/4 border-r-2 border-neutral-400'>
                    <p className='text-[16px] text-neutral-400'>{t('Discover')}</p>
                    <h3 className='text-[20px] font-bold'>{t('Choose Departure City')}</h3>
                </div>
                <div className='w-full md:basis-1/4 border-r-2 border-neutral-400'>
                    <p className='text-[16px] text-neutral-400'>{t('Select')}</p>
                    <h3 className='text-[20px] font-bold'>{t('Select Arrival City')}</h3>
                </div>
                <div className='w-full md:basis-1/4 border-r-2 border-neutral-400'>
                    <p className='text-[16px] text-neutral-400'>{t('Choose')}</p>
                    <h3 className='text-[20px] font-bold'>{t('Departure Date')}</h3>
                </div>
                <div className='w-full md:basis-1/4'>
                    <p className='text-[16px] text-neutral-400'>{t('Choose')}</p>
                    <h3 lassName='text-[20px] font-bold'>{t('Return Date')}</h3>
                </div>
                <Link to="/mytrips"><motion.img
                    animate={{ x: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }} className='bg-slate-700 p-4 rounded-md' src={arrow} /></Link>
            </div>
        </div>
    );
}
export default Banner;