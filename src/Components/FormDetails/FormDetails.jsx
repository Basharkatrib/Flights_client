import { useEffect, useState } from 'react';
import Icon from '../../assets/images/Icon.svg';
function FormDetails() {

    const [price, setprice] = useState(0);

    return (
        <div className="w-full bg-[#EEEEEE] flex flex-col justify-start p-4 gap-5 h-full">
            <img className='w-6' src={Icon} />
            <div className='font-bold text-[30px]'>Flight Details</div>
            <form className='flex flex-col gap-3'>
                <div className='flex flex-col'>
                    <label className='font-bold'>From</label>
                    <input className='outline-none border-none rounded-md p-1' type='text' />
                </div>
                <div className='flex flex-col'>
                    <label className='font-bold'>From</label>
                    <input className='outline-none border-none rounded-md p-1' type='text' />
                </div>
                <div className='flex flex-col'>
                    <label className='font-bold'>From</label>
                    <input className='outline-none border-none rounded-md p-1' type='text' />
                </div>
                <div className='flex flex-col'>
                    <label className='font-bold'>From</label>
                    <input className='outline-none border-none rounded-md p-1' type='text' />
                </div>
                <button className='bg-[#8BA145] text-white p-1 rounded-md font-bold' type='submit'>Select Flight</button>
            </form>

            <div className='w-full flex flex-col gap-9 mt-5'>
                <div className='flex flex-col gap-3'>
                    <div className='font-bold'>Class</div>
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
                    </form>
                </div>
                <div className='flex flex-col gap-3'>
                    <div className='font-bold'>Class</div>
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
                    </form>
                    <form className='w-full flex items-center gap-3'>
                        <label>${price}</label>
                        <input type="range" id="volume" name="volume" min="100" max="400" value={price} onChange={(e) => setprice(e.target.value)} className='accent-[#8BA145] w-full' />
                        <label>$400</label>
                    </form>
                </div>
            </div>

        </div>
    );
}
export default FormDetails;