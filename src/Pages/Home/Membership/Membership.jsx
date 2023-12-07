import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Membership = () => {
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
            <h1 className="text-4xl font-bold text-center mt-10">Membership Package</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 mx-auto gap-10 my-10 px-12 md:px-20 lg:px-24">
                
                {membership.map((member) => (
                    <div key={member.id} className="card card-compact h-[320px] md:h-[250px] lg:h-[320px] bg-base-100 shadow-xl border-orange-500 border-[1px]">
                        <figure><img className='h-5/6 w-1/2' src={member.img} alt="" /></figure>
                        <div className="card-body text-center">
                            <h2 className="card-title text-lg font-medium">Item: {member.name}</h2>
                            <h2 className="card-title text-lg font-medium">Price: <span className="text-orange-500">${member.price}</span></h2>

                            <div className="card-actions flex flex-row justify-center">
                                <Link to={`/checkout/${member.name}`} >
                                    <button className="btn btn-warning w-56 md:w-32 lg:w-56 text-base text-white bg-orange-500 border-orange-400 normal-case">Checkout</button>
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
