import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Trip from '../Trip/Trip';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { addSpinner, removeSpinner, selectSpinner } from "../../store/spinnerSlice";
import Skelaton from '../Skelaton/Skelaton';
import toast from 'react-hot-toast';


function Trips({ handle, search }) {


    const [data, setData] = useState([]);
    const lang = useSelector(state => state.lang.lang);
    const [loading, setLoading] = useState(true);
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();



    useEffect(() => {
        const fetchData = async () => {
            dispatch(addSpinner());
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_KEY}/api/flights?locale=${lang}&populate=*`);
                setData(response.data.data);
            } catch (error) {
                console.log(error);
            } finally {
                dispatch(removeSpinner());
                setLoading(false);
            }
        };
        fetchData();
    }, [lang]);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(3);

    const isSearchValid = useMemo(() => {
        return search && Object.keys(search).length !== 0 && Object.values(search).every(value => value !== '');
    }, [search]);

    const filteredAll = useMemo(() => {
        if (!isSearchValid) return data;
        return data.filter(item =>
            item.price < search.price &&
            item.departure_airport === search.from &&
            item.arrival_airport === search.to &&
            item.available_seats >= search.passengers
        );
    }, [data, isSearchValid, search]);

    const totalPages = Math.ceil(filteredAll.length / itemsPerPage) || 1;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = filteredAll.slice(startIndex, endIndex);

    const handleChange = (event, value) => {
        setCurrentPage(value);
    };

  

    useEffect(() => {
        i18n.changeLanguage(lang);
    }, [lang]);

    useEffect(() => {
        if (isSearchValid && filteredAll.length === 0) {
            toast.error(t('no_results'));
        }
    }, [isSearchValid, filteredAll.length, t]);

    if(loading){
       return <Skelaton count={3} ok={true} width={100} />;
    }

 

    return (
        <div className={`p-4 w-full ${lang === "ar"? 'text-right' : 'text-left'}`}>
            <div className='mb-4'>
                <div className='text-slate-500 text-sm'>{t('Showing Results for')}</div>
                <div className="font-bold text-[22px] md:text-[28px]">{t('Departure flights')}</div>
                <div className={`w-full flex ${lang === "ar"? 'justify-end' : 'justify-start'}`}>
                    <button
                        onClick={handle}
                        className={`flex mt-3 md:hidden cursor-pointer items-center gap-2 border border-slate-300 hover:border-slate-500 transition w-fit px-3 py-1.5 rounded-md bg-white shadow-sm`}
                    >
                        <svg className='w-4' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path fill="#334155" d="M3.9 54.9C10.5 40.9 24.5 32 40 32l432 0c15.5 0 29.5 8.9 36.1 22.9s4.6 30.5-5.2 42.5L320 320.9 320 448c0 12.1-6.8 23.2-17.7 28.6s-23.8 4.3-33.5-3l-64-48c-8.1-6-12.8-15.5-12.8-25.6l0-79.1L9 97.3C-.7 85.4-2.8 68.8 3.9 54.9z" />
                        </svg>
                        <div className='font-bold text-sm'>{t('Filter')}</div>
                    </button>
                </div>
            </div>
            <div className='flex flex-col items-center'>
                <div className='w-full space-y-2'>
                    {currentItems.length === 0 ? (
                        <div className={`w-full ${lang === "ar"? 'text-right' : 'text-left'} bg-slate-50 border border-dashed border-slate-300 rounded-md p-4 text-slate-600`}>
                            <div className='font-semibold mb-1'>{t('no_results')}</div>
                            <div className='text-sm'>{t('adjust_filters')}</div>
                        </div>
                    ) : (
                        currentItems.map(item => (
                            <div key={item.id}>
                                <Trip data={item} />
                            </div>
                        ))
                    )}
                </div>
                <Stack spacing={2} className='mt-4'>
                    <Pagination count={totalPages} page={currentPage} onChange={handleChange} />
                </Stack>
            </div>
        </div>
    );
}
export default Trips;