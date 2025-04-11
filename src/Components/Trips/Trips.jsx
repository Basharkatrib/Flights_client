import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Trip from '../Trip/Trip';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { addSpinner, removeSpinner, selectSpinner } from "../../store/spinnerSlice";

function Trips({ handle, search }) {


    const [data, setData] = useState([]);
    const lang = useSelector(state => state.lang.lang);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();



    useEffect(() => {
        const fetchData = async () => {
            dispatch(addSpinner());
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_KEY}/api/flights?locale=${lang}&populate=*`);
                setData(response.data.data);
                console.log(data)
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
    const [itemsPerPage, setItemsPerPage] = useState(2);

    const totalPages = Math.ceil(data.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = data.slice(startIndex, endIndex);

    const handleChange = (event, value) => {
        setCurrentPage(value);
    };

    useEffect(() => {
        console.log(search?.passengers)
    }, [search])

    return (
        <div className="p-4 w-full">
            <div>
                <div>Showing Results for</div>
                <div className="font-bold text-[30px]">Departure flights</div>
                <button
                    onClick={handle}
                    className='flex mt-3 md:hidden cursor-pointer gap-2 border-[1px] border-gray-900 w-fit p-1 rounded-sm'
                >
                    <svg className='w-4' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path fill="#8ba945" d="M3.9 54.9C10.5 40.9 24.5 32 40 32l432 0c15.5 0 29.5 8.9 36.1 22.9s4.6 30.5-5.2 42.5L320 320.9 320 448c0 12.1-6.8 23.2-17.7 28.6s-23.8 4.3-33.5-3l-64-48c-8.1-6-12.8-15.5-12.8-25.6l0-79.1L9 97.3C-.7 85.4-2.8 68.8 3.9 54.9z" />
                    </svg>
                    <div className='font-bold'>Filter</div>
                </button>

            </div>
            <div className='flex flex-col items-center'>
                <div className='w-full'>

                    {search && Object.keys(search).length !== 0 && Object.values(search).every(value => value !== '' ) ? (
                        currentItems
                            .filter(item =>
                                item.price < search.price &&
                                item.departure_airport === search.from &&
                                item.arrival_airport === search.to &&
                                item.available_seats >= search.passengers
                            )
                            .map(item => (
                                <div key={item.id}>
                                    <Trip data={item} />
                                </div>
                            ))
                    ) : (
                        currentItems.map(item => (
                            <div key={item.id}>
                                <Trip data={item} />
                            </div>
                        ))
                    )}
                </div>
                <Stack spacing={2}>
                    <Pagination count={totalPages} page={currentPage} onChange={handleChange} />
                </Stack>
            </div>
        </div>
    );
}
export default Trips;