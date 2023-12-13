import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';




const Membership = () => {
    useEffect(() => {
        AOS.init();
    }, [])
    const [membership, setMembership] = useState([]);

    useEffect(() => {
        fetch('https://uni-dine-server.vercel.app/membership')
            .then(res => res.json())
            .then(data => {
                setMembership(data);
            });
    }, []);

    // console.log(membership);
    
    return (
        <div>
            <h1 className="text-4xl font-bold text-center mt-16">Membership Package</h1>
            <h6 className="text-center text-lg lg:text-xl m-4">Purchase membership to make a meal request!</h6>
            <div  className="grid grid-cols-1 md:grid-cols-3 mx-auto gap-12 my-10 px-20 md:px-24 lg:px-48">
                
                {membership.map((member) => (
                    <div data-aos="zoom-in" key={member.id} className="card card-compact h-[300px] md:h-[250px] lg:h-[300px] bg-base-100 shadow-xl border-orange-500 border-[1px]">
                        <figure><img className='h-5/6 w-1/2' src={member.img} alt="" /></figure>
                        <div className="card-body items-center text-center">
                            <h2 className="card-title text-lg font-semibold">Package: {member.name}</h2>
                            <h2 className="card-title text-lg font-semibold">Price: <span className="text-orange-500">${member.price}</span></h2>

                            <div className="card-actions flex flex-row justify-center">
                                <Link to={`/checkout/${member.name}`} >
                                    <button className="btn btn-warning w-48 md:w-32 lg:w-56 text-base text-white bg-orange-500 border-orange-400 normal-case">Checkout</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default Membership;
