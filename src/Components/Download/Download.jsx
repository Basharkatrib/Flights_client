import { useEffect, useState } from "react";
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
function Download() {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const lang = useSelector(state => state.lang.lang);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_KEY}/api/download?locale=${lang}&populate=*`);
                setData(response.data.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [lang]);


    if (loading) {
        return <div>Loading...</div>;
    }


    return (
        <div className="w-full p-4 h-[300px] md:h-auto">
            <div className="w-full h-full relative">
                {data && <img className="w-full h-full" src={data.image.url} />}
                <div className="absolute text-white z-30 top-3 md:top-1/4 left-4 w-[300px] md:w-[500px]">
                   <div className="text-xl md:text-2xl xl:text-5xl font-bold">{data.title}</div>
                   <div className="text-[16px] md:text-xl xl:text-2xl font-bold">{data.desc}</div>
                   <div className="py-2 px-4 w-fit font-bold rounded-md mt-10 cursor-pointer bg-[#D9D9D9] text-black">{data.button.title}</div>
                </div>

            </div>

        </div>
    );
}
export default Download;