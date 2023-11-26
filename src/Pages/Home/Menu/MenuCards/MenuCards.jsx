import { Link } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { AuthContext } from "../../../Providers/AuthProvider/AuthProvider";
import { useContext, useEffect } from "react";
import swal from 'sweetalert';


const MenuCards = ({ items }) => {

    useEffect(() => {
        AOS.init();
    }, [])

    const { user } = useContext(AuthContext);

    const handleViewDetails = () => {
        if (!user) {
            swal("You are not currently logged in!", "Log in first", "error");
        }
    };

    return (
        <div data-aos="zoom-in" key={items.id} className="card card-compact  h-[390px] bg-base-100 shadow-xl border-pink-500 border-[1px]">
            <figure><img className='h-[200px] w-full' src={items.img} alt="" /></figure>
            <div className="card-body">
                <h2 className="card-title text-lg font-medium">Item: {items.title}</h2>
                <h2 className="card-title text-lg font-medium">Price: <span className="text-orange-500">{items.price}</span></h2>
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
                <div className="card-actions">
                    <Link to={`/meals/${items._id}`} onClick={handleViewDetails}>
                        <button className="btn btn-warning w-80 text-base text-white bg-orange-500 border-orange-400 normal-case">View Details</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default MenuCards;