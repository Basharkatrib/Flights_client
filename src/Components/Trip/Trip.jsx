import exit from '../../assets/images/x.svg';
import arrow from '../../assets/images/arrow.svg';
import { setSelectedFlight, deleteSelectedFlight} from '../../store/flightSelectedSlice';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function Trip({data}) {


    const [open, setOpen] = useState(false);
    const flight = useSelector(state => state.flightselect);
    const dispatch = useDispatch();
    const [cancel, setCancel] = useState(false)

    useEffect(()=>{
        console.log(flight.selectedFlight)
    },[flight]);

    const selectFlight = ()=>{
        dispatch(setSelectedFlight(data));
        setCancel(!cancel);
    };

    const deleteFlight = () => {
        dispatch(deleteSelectedFlight({ id: data.id })); 
        setCancel(!cancel);
    }

  



    
    return (
        <div className="flex flex-col gap-5 w-full mt-5 bg-[#EEEEEE] p-2 mb-5 rounded-md basis-1/2">
            <div className='flex justify-between w-full mb-3'>
                <div>Flight {data.id}</div>
                <img className={`${open ? "block" : "hidden"} cursor-pointer`} src={exit} onClick={() => setOpen(false)} />
            </div>
            <div className='flex w-full justify-between'>
                <div className='flex flex-col basis-[10%] gap-3'>
                    <div>{data.departure_time}</div>
                    <div>{data.departure_airport}</div>
                </div>
                <div className='flex flex-col items-center basis-[80%] gap-3'>
                    <div>Departure Time {data.departure_time}</div>
                    <hr className='w-full' />
                    <div>10h 20m</div>
                    <div>{data.stops} stop</div>
                </div>
                <div className='flex flex-col basis-[10%] items-end gap-3'>
                    <div>{data.arrival_time}</div>
                    <div>{data.arrival_airport}</div>
                </div>
            </div>
            <div className={`${open ? "hidden" : "block"} w-full flex justify-end`}>
                <img className='w-6 flex justify-end cursor-pointer' onClick={() => setOpen(true)} src={arrow} />
            </div>

            <div className={`${open ? "max-h-screen" : "max-h-0"} transition-all duration-500 w-full flex flex-col gap-5`}>
                <div className={`${open ? "opacity-100" : "opacity-0"} flex justify-end transition-all duration-500`}>
                    <div className={`${cancel ? "hidden" : "block"} bg-[#8BA145] p-2 text-white font-bold rounded-md shadow-xl cursor-pointer`} onClick={() => selectFlight()}>Select Flight</div>
                    <div className={`${cancel ? "block" : "hidden"} bg-red-800 p-2 text-white font-bold rounded-md shadow-xl cursor-pointer`} onClick={() => deleteFlight()}>Cancel</div>
                </div>
                <div className={`font-bold text-[24px] ${open ? "opacity-100" : "opacity-0"} transition-all duration-500`}>{data.departure_airport} - {data.arrival_airport}, {data.date}</div>
                <div class="flex w-full  divide-x-2 divide-dashed divide-gray-300 rounded-md overflow-hidden text-sm font-sans">
                    <div class="flex flex-col items-center px-4 py-2 basis-1/2">
                        <div class="flex items-center space-x-2 w-full">
                            <div class="text-center">
                                <div class="font-semibold">AUH</div>
                                <div class="text-gray-500 text-xs">{data.departure_terminal}</div>
                                <div class="text-gray-500 text-xs">00:15</div>
                            </div>
                            <div class="h-0.5 bg-black w-full relative">
                                <div class="w-2 h-2 rounded-full bg-black absolute -left-1 top-1/2 -translate-y-1/2"></div>
                                <div class="w-2 h-2 rounded-full bg-black absolute -right-1 top-1/2 -translate-y-1/2"></div>
                            </div>
                            <div class="text-center">
                                <div class="font-semibold">BOM</div>
                                <div class="text-gray-500 text-xs">{data.arrival_terminal}</div>
                                <div class="text-gray-500 text-xs">04:45</div>
                            </div>
                        </div>
                        <div class="text-gray-500 text-xs mt-1">🕒 03h00m</div>
                    </div>

                    <div class="flex flex-col items-center px-4 py-2 basis-1/2">
                        <div class="flex items-center space-x-2 w-full">
                            <div class="text-center">
                                <div class="font-semibold">BOM</div>
                                <div class="text-gray-500 text-xs">T2</div>
                                <div class="text-gray-500 text-xs">07:45</div>
                            </div>
                            <div class="h-0.5 w-full bg-black relative">
                                <div class="w-2 h-2 rounded-full bg-black absolute -left-1 top-1/2 -translate-y-1/2"></div>
                                <div class="w-2 h-2 rounded-full bg-black absolute -right-1 top-1/2 -translate-y-1/2"></div>
                            </div>
                            <div class="text-center">
                                <div class="font-semibold">BKK</div>
                                <div class="text-gray-500 text-xs"></div>
                                <div class="text-gray-500 text-xs">13:35</div>
                            </div>
                        </div>
                        <div class="text-gray-500 text-xs mt-1">🕒 10h20m</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Trip;