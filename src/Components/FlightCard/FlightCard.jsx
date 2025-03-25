function FlightCard({ item }) {
    return (
        <div className="w-full md:basis-[23%] relative h-[350px] rounded-md">
            {item && item.image[0] && <img className="w-full h-full rounded-md object-cover opacity-80 transition-all duration-300 hover:opacity-100" src={item.image[0].url} />}
            <div className="absolute text-2xl font-bold text-white top-3/4 left-2">
                <div>{item.title}</div>
                <div>From $ {item.price}</div>
            </div>
        </div>
    )
}
export default FlightCard;