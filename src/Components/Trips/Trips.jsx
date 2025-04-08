import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Trip from '../Trip/Trip';
import axios from 'axios';
import { useSelector } from 'react-redux';

function Trips() {


    const [data, setData] = useState([]);
    const lang = useSelector(state => state.lang.lang);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_KEY}/api/flights?locale=${lang}&populate=*`);
                setData(response.data.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [lang]);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(3);

    const totalPages = Math.ceil(data.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = data.slice(startIndex, endIndex);

    const handleChange = (event, value) => {
        setCurrentPage(value);
    };

    return (
        <div className="p-4 w-full">
            <div>
                <div>Showing Results for</div>
                <div className="font-bold text-[30px]">Departure flights</div>
            </div>
            <div className='flex flex-col items-center'>
                <div className='w-full'>
                    {currentItems.map(item => (
                        <div key={item.id}>
                            <Trip data={item} />
                        </div>
                    ))}
                </div>
                <Stack spacing={2}>
                    <Pagination count={totalPages} page={currentPage} onChange={handleChange} />
                </Stack>
            </div>
        </div>
    );
}
export default Trips;