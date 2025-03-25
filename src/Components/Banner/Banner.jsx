import banner from '../../assets/images/banner.jpg'
import button from '../../assets/images/Frame.svg'

function Banner(){
    return(
        <div className=' h-[568px] w-full relative'>
            <img className='h-full w-full object-cover' src={banner} />
            <div className='absolute w-[80%] -bottom-12 left-1/2 gap-3 -translate-x-1/2 rounded-md flex flex-col md:flex-row items-center bg-[#EEEEEE] p-3'>
                <div className='w-full md:basis-1/4 border-r-2 border-neutral-400'>
                    <p className='text-[16px] text-neutral-400'>Discover</p>
                    <h3 className='text-[20px] font-bold'>Choose Departure City</h3>
                </div>
                <div className='w-full md:basis-1/4 border-r-2 border-neutral-400'>
                    <p className='text-[16px] text-neutral-400'>Select</p>
                    <h3 className='text-[20px] font-bold'>Select Arrival City</h3>
                </div>
                <div className='w-full md:basis-1/4 border-r-2 border-neutral-400'>
                    <p className='text-[16px] text-neutral-400'>Choose</p>
                    <h3 className='text-[20px] font-bold'>Departure Date</h3>
                </div>
                <div className='w-full md:basis-1/4'>
                    <p className='text-[16px] text-neutral-400'>Choose</p>
                    <h3 lassName='text-[20px] font-bold'>Return Date</h3>
                </div>
                <img src={button} />
            </div>
        </div>
    );
}
export default Banner;