import { useEffect, useState } from "react";
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { addSpinner, removeSpinner, selectSpinner } from "../../store/spinnerSlice";
function Services() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const lang = useSelector(state => state.lang.lang);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            dispatch(addSpinner());
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_KEY}/api/services?locale=${lang}&populate=*`);
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



    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="w-full p-4 flex flex-wrap md:justify-center xl:justify-between items-center">
            {
                data?.map((item, index) => (
                    <div key={index} className="basis-full md:basis-1/2 xl:basis-1/3 mb-10  flex flex-col items-center text-center gap-5">
                        <img src={item.image[0].url} />
                        <div className="text-[24px] font-bold">{item.title}</div>
                        <div>{item.desc}</div>
                    </div>
                ))
            }

        </div>
    );
}
export default Services;