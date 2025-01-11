import { useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';


const Banner = () => {

    useEffect(() => {
        AOS.init();
    }, [])


    return (
        <div data-aos="zoom-in" className="hero min-h-screen mb-10" style={{ backgroundImage: 'url(https://i.ibb.co/tPzPnHP/delimeal-bg.jpg)' }}>
        <div className="hero-overlay bg-opacity-20"></div>
        <div className="hero-content text-center lg:text-right">
            <div className="lg:min-w-[1100px]">
                <h1 className="text-5xl text-black font-bold">DashDine:</h1>
                <h1 className="text-5xl my-4 text-black font-bold">Streamlining Hostel Life</h1>
                <p className="my-2 text-black text-xl lg:text-2xl font-medium">Elevate Campus Living with our Hostel Management System–</p>
                <p className="mb-4 text-black text-xl lg:text-2xl font-medium">Where Delicious Meals and Convenience Unite!</p>
                <div className="form-control">
                    <div className="input-group">
                        <input
                            type="text"
                            placeholder="Search here…"
                            className="input rounded-r-none border-gray-300 ml-6 lg:ml-12 w-40 lg:w-96"
                        />
                        <button
                            className="bg-orange-600 text-white px-4 py-3 rounded-r-lg"
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
};

export default Banner;