import { Link, Navigate, useNavigate } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useContext, useEffect, useState } from "react";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import swal from "sweetalert";
import { AuthContext } from "../Providers/AuthProvider/AuthProvider";
import IsLike from "../../hooks/IsLike";


const UpcomingCard = ({ items }) => {

    const { _id, rating, title, price, category } = items;
    const { user } = useContext(AuthContext);
    const email = user?.email;
    const navigate = useNavigate();

    useEffect(() => {
        AOS.init();
    }, [])

    const [liked, setLiked] = useState(false);
    // const [like, refetch] = useLike();



    //post liked data
    const handleLike = async () => {
        if (user) {
            setLiked(true);
            
            const likedData = { mealID: _id, title, liked: true, email: email };
            fetch("http://localhost:5000/likes", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(likedData),
            }).then(() => {
                // After adding a like, fetch all likes to update the length
                refetch();
            });
        } else {
            swal("You are not currently logged in!", "Log in first", "error").then(() => {
                // <Navigate state={location.pathname} to='/login'></Navigate>;
                navigate('/' );
            });
        }
    };

    // const [userLikes, setUserLikes] = useState([]);
    // console.log(userLikes);

    // useEffect(() => {
    //     fetch(`http://localhost:5000/samelikes?email=${user?.email}`)
    //         .then((res) => res.json())
    //         .then((data) => setUserLikes(data));
    // }, []);

    // console.log(userLikes);
    // console.log(userLikes.includes(_id));

    const [isLiked, refetch]= IsLike();
    const isLike = isLiked.includes(_id);


    return (
        <div data-aos="zoom-in" key={items.id} className="card card-compact  h-[390px] bg-base-100 shadow-xl border-orange-500 border-[1px]">
            <figure><img className='h-[200px] w-full' src={items.img} alt="" /></figure>
            <div className="card-body">
                <h2 className="card-title text-lg font-medium">Item: {title}</h2>
                <h2 className="card-title text-lg font-medium">Category: {category}</h2>
                <h2 className="card-title text-lg font-medium">Price: {price}</h2>
                <div className="flex justify-between mx-4">
                    <div className="flex justify-center">
                        {/* <span className="card-title text-lg font-medium">Rating: </span> */}
                        {Array.from({ length: 5 }).map((_, index) => {
                            if (index < Math.floor(rating)) {
                                return (
                                    <span key={index} className="text-yellow-400 text-2xl">
                                        ★
                                    </span>
                                );
                            } else if (
                                index === Math.floor(rating) &&
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
                    <div>
                        {isLike || liked ? (
                            <FcLike className="text-4xl" />

                        ) : (
                            <FcLikePlaceholder
                                className="text-4xl"
                                onClick={handleLike}
                            />
                        )}
                    </div>
                </div>
                
            </div>
        </div>
    );
};

export default UpcomingCard;