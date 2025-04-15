import { useEffect, useState } from 'react';
import Icon from '../../assets/images/Icon.svg';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
function FormDetails({handle , handleSearch}) {

    const [data, setData] = useState({});
    const lang = useSelector(state => state.lang.lang);
    const { t, i18n } = useTranslation();
    

    const handleData = (data) => {
        handleSearch(data);
        handle();
        localStorage.setItem('searchData', JSON.stringify(data));
    }

    useEffect(() => {
            i18n.changeLanguage(lang);
        }, [lang]);

    return (
        <div className={`w-full ${lang === "ar"? 'text-right' : "text-left"} bg-[#EEEEEE] flex flex-col justify-start p-4 gap-5 h-full`}>
            <div className={`w-full flex ${lang === "ar"? 'justify-end' : 'justify-start'}`}><img className={`w-6 ${lang === "ar"? 'transform rotate-[180deg]' : ''} cursor-pointer flex`} src={Icon} onClick={()=> {handle()}}/></div>
            <div className='font-bold text-[30px]'>{t('Flight Details')}</div>
            <form className='flex flex-col gap-3'>
                <div className='flex flex-col'>
                    <label className='font-bold'>{t('From')}</label>
                    <input className={`outline-none ${lang === "ar"? 'text-right' : 'text-left'} border-none rounded-md p-1`} type='text' value={data.from} onChange={ e => { setData( prev => ({...prev, from:e.target.value}))}} />
                </div>
                <div className='flex flex-col'>
                    <label className='font-bold'>{t('To')}</label>
                    <input className={`outline-none ${lang === "ar"? 'text-right' : 'text-left'} border-none rounded-md p-1`} type='text' value={data.to} onChange={ e => { setData( prev => ({...prev, to:e.target.value}))}} />
                </div>
                <div className='flex flex-col'>
                    <label className='font-bold'>{t('Departure Date')}</label>
                    <input className={`outline-none ${lang === "ar"? 'text-right' : 'text-left'} border-none rounded-md p-1`} type='text' value={data.departure_date} onChange={ e => { setData( prev => ({...prev, departure_date:e.target.value}))}} />
                </div>
                <div className='flex flex-col'>
                    <label className='font-bold'>{t('Number of travelers')}</label>
                    <input className={`outline-none ${lang === "ar"? 'text-right' : 'text-left'} border-none rounded-md p-1`} type='text' value={data.passengers} onChange={ e => { setData( prev => ({...prev, passengers:e.target.value}))}} />
                </div>
            </form>
            <button onClick={() => { handleData(data) }} className='bg-slate-700 text-white p-1 rounded-md font-bold'>{t('Select Flight')}</button>

            <div className='w-full flex flex-col gap-2'>
                <div className='flex flex-col gap-3'>
                    {/* <div className='font-bold'>Class</div>
                    <form>
                        <div className='flex gap-2'>
                            <input type='radio' name="class" className='border-red-500' />
                            <label>Economy class</label>
                        </div>
                        <div className='flex gap-2'>
                            <input type='radio' name="class" />
                            <label>Economy class</label>
                        </div>
                        <div className='flex gap-2'>
                            <input type='radio' name="class" />
                            <label>Economy class</label>
                        </div>
                    </form> */}
                </div>
                <div className='flex flex-col '>
                    {/* <div className='font-bold'>Class</div>
                    <form>
                        <div className='flex gap-2'>
                            <input type='radio' name="class" />
                            <label>Economy class</label>
                        </div>
                        <div className='flex gap-2'>
                            <input type='radio' name="class" />
                            <label>Economy class</label>
                        </div>
                        <div className='flex gap-2'>
                            <input type='radio' name="class" />
                            <label>Economy class</label>
                        </div>
                    </form> */}
                    <form className='w-full flex items-center gap-3'>
                        <label>${data.price? data.price : "250"}</label>
                        <input type="range" id="volume" name="volume" min="100" max="500" value={data.price} onChange={ e => { setData( prev => ({...prev, price:e.target.value}))}} className='accent-[#334155] w-full' />
                        <label>$500</label>
                    </form>
                </div>
            </div>

        </div>
    );
}
export default FormDetails;