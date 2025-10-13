import { useEffect, useState } from 'react';
import Icon from '../../assets/images/Icon.svg';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
function FormDetails({handle , handleSearch}) {

    const [data, setData] = useState({});
    const lang = useSelector(state => state.lang.lang);
    const { t, i18n } = useTranslation();
    

    const [errors, setErrors] = useState({});

    const validate = (values) => {
        const newErrors = {};
        if (!values.from || values.from.trim() === '') newErrors.from = t('required_field');
        if (!values.to || values.to.trim() === '') newErrors.to = t('required_field');
        if (!values.departure_date || values.departure_date.trim() === '') newErrors.departure_date = t('required_field');
        if (!values.passengers || Number(values.passengers) < 1) newErrors.passengers = t('required_field');
        return newErrors;
    };

    const handleData = (data) => {
        const newErrors = validate(data || {});
        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) {
            toast.error(t('please_fill_all_fields'));
            return;
        }
        handleSearch(data);
        handle();
        localStorage.setItem('searchData', JSON.stringify(data));
    }

    const handleReset = () => {
        setData({});
        setErrors({});
        handleSearch({});
        localStorage.removeItem('searchData');
    }

    useEffect(() => {
            i18n.changeLanguage(lang);
        }, [lang]);

    return (
        <div className={`w-full ${lang === "ar"? 'text-right' : "text-left"} bg-[#F5F7FA] flex flex-col justify-start p-4 gap-5 h-full`}>
            <div className={`w-full flex ${lang === "ar"? 'justify-end' : 'justify-start'}`}><img className={`w-6 ${lang === "ar"? 'transform rotate-[180deg]' : ''} cursor-pointer flex`} src={Icon} onClick={()=> {handle()}}/></div>
            <div className='font-bold text-[24px] md:text-[28px]'>{t('Flight Details')}</div>
            <form className='flex flex-col gap-4'>
                <div className='flex flex-col'>
                    <label className='font-bold mb-1'>{t('From')}</label>
                    <input className={`outline-none ${lang === "ar"? 'text-right' : 'text-left'} border ${errors.from ? 'border-red-500' : 'border-slate-200'} rounded-md p-2 bg-white focus:ring-2 focus:ring-slate-300 transition`} type='text' placeholder='DXB' value={data.from || ''} onChange={ e => { setData( prev => ({...prev, from:e.target.value}))}} />
                    {errors.from && <span className='text-red-600 text-xs mt-1'>{errors.from}</span>}
                </div>
                <div className='flex flex-col'>
                    <label className='font-bold mb-1'>{t('To')}</label>
                    <input className={`outline-none ${lang === "ar"? 'text-right' : 'text-left'} border ${errors.to ? 'border-red-500' : 'border-slate-200'} rounded-md p-2 bg-white focus:ring-2 focus:ring-slate-300 transition`} type='text' placeholder='CAI' value={data.to || ''} onChange={ e => { setData( prev => ({...prev, to:e.target.value}))}} />
                    {errors.to && <span className='text-red-600 text-xs mt-1'>{errors.to}</span>}
                </div>
                <div className='flex flex-col'>
                    <label className='font-bold mb-1'>{t('Departure Date')}</label>
                    <input className={`outline-none ${lang === "ar"? 'text-right' : 'text-left'} border ${errors.departure_date ? 'border-red-500' : 'border-slate-200'} rounded-md p-2 bg-white focus:ring-2 focus:ring-slate-300 transition`} type='date' value={data.departure_date || ''} onChange={ e => { setData( prev => ({...prev, departure_date:e.target.value}))}} />
                    {errors.departure_date && <span className='text-red-600 text-xs mt-1'>{errors.departure_date}</span>}
                </div>
                <div className='flex flex-col'>
                    <label className='font-bold mb-1'>{t('Number of travelers')}</label>
                    <input className={`outline-none ${lang === "ar"? 'text-right' : 'text-left'} border ${errors.passengers ? 'border-red-500' : 'border-slate-200'} rounded-md p-2 bg-white focus:ring-2 focus:ring-slate-300 transition`} type='number' min='1' value={data.passengers || ''} onChange={ e => { setData( prev => ({...prev, passengers:e.target.value}))}} />
                    {errors.passengers && <span className='text-red-600 text-xs mt-1'>{errors.passengers}</span>}
                </div>
            </form>
            <div className='flex items-center gap-3'>
                <button onClick={() => { handleData(data) }} className='bg-slate-700 hover:bg-slate-800 transition text-white p-2 rounded-md font-bold shadow'>
                    {t('Select Flight')}
                </button>
                <button onClick={handleReset} type='button' className='bg-white border border-slate-300 hover:border-slate-500 text-slate-700 p-2 rounded-md font-semibold shadow-sm'>
                    {t('Reset')}
                </button>
            </div>

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
                        <label className='text-slate-700 font-semibold'>${data.price? data.price : "250"}</label>
                        <input type="range" id="volume" name="volume" min="100" max="500" value={data.price || 250} onChange={ e => { setData( prev => ({...prev, price:e.target.value}))}} className='accent-[#334155] w-full' />
                        <label className='text-slate-500'>$500</label>
                    </form>
                </div>
            </div>

        </div>
    );
}
export default FormDetails;