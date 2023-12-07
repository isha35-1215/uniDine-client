import { Link } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";


const MenuCards = ({ items }) => {

    useEffect(() => {
        AOS.init();
    }, [])


    

    return (
        <div data-aos="zoom-in" key={items.id} className="card card-compact  h-[390px] bg-base-100 shadow-xl border-orange-500 border-[1px]">
            <figure><img className='h-[200px] w-full' src={items.img} alt="" /></figure>
            <div className="card-body text-center items-center ">
                <h2 className="card-title text-lg font-semibold">{items.title}</h2>
                <h2 className="card-title text-lg font-semibold">Price: <span className="text-orange-500">${items.price}</span></h2>
                <div className="flex justify-center">
                    {/* <span className="card-title text-lg font-medium">Rating: </span> */}
                    {Array.from({ length: 5 }).map((_, index) => {
                        if (index < Math.floor(items.rating)) {
                            return (
                                <span key={index} className="text-yellow-400 text-2xl">
                                    ★
                                </span>
                            );
                        } else if (
                            index === Math.floor(items.rating) &&
                            items.rating % 1 !== 0
                        ) {
                            return (
                                <span key={index} className="text-yellow-400 text-2xl">
                                    ★
                                </span>
                            );
                        } else {
                            return (
                                <span key={index} className="text-gray-400 text-2xl">
                                    ☆
                                </span>
                            );
                        }
                    })}
                </div>
                <div className="card-actions flex flex-row justify-center">
                    <Link to={`/meal/${items._id}`} >
                        <button className="btn btn-warning w-64 md:w-36 lg:w-60 text-base text-white bg-orange-500 border-orange-400 normal-case">View Details</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default MenuCards;