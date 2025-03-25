import { useEffect, useState } from "react";
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";


function Footer(){

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const lang = useSelector(state => state.lang.lang);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_KEY}/api/footers?locale=${lang}&populate=footer.group`);
                setData(response.data.data[0]);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [lang]);

    useEffect(()=>{
      console.log(data)
    },[data])

    if (loading) {
        return <div>Loading...</div>;
    }
    
    return(
        <div className="w-full text-center px-4 py-8 gap-5 flex flex-wrap justify-center  md:justify-between mt-10 border-t-2 border-neutral-400 ">
        {
                data && data.footer && data.footer.map((item, index) => (
                    <div key={index} className="w-full flex flex-col basis-[100%] md:basis-[48%] xl:basis-[23%] ">
                        <div className="text-[24px] font-bold text-slate-700">{item.title}</div>
                        <div className="flex flex-col h-full ">
                        {
                            item.group.map((link,index)=>(
                                <div>{link.title}</div>
                            ))
                        }
                        </div>
                    </div>
                ))
            }

        </div>
    );
}
export default Footer;