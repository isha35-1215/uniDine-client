import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { useContext, useState } from "react";
import { AuthContext } from "../Providers/AuthProvider/AuthProvider";
import swal from "sweetalert";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";


const MealsDetails = () => {

    const mealData = useLoaderData();
    const { _id, title, img, rating, price, category, admin, description, ingredients, postTime, like } = mealData;
    const [liked, setLiked] = useState(false);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const axiosSecure = useAxiosSecure();
    const { refetch, data: likes = [] } = useQuery({
        queryKey: ['likes'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/meals`);
            return res.data;
        }
    })


    const handleLike = async () => {
        if (user) {
            setLiked(true);
            const likeCount = parseInt(like);
            const updateCount = likeCount + 1;
            console.log(updateCount);
            await axiosSecure.patch(`/meals/${_id}`, { like: updateCount });
            // Refetch likes after updating
            await refetch();
        } else {
            swal("You are not currently logged in!", "Log in first", "error")
                .then(() => {
                    navigate('/login', { state: { from: location } });
                });
        }
    };


    return (
        <div>
            <div className="max-w-full mx-auto rounded-md bg-cover bg-center">
                <img src={img} alt={title} className="w-full max-h-[450px] bg-cover" />
                <div className="max-w-6xl mx-auto my-10">
                    <h1 className="text-3xl font-bold my-2">Item: {title}</h1>
                    <h2 className="text-2xl font-semibold my-2">Price: <span className="text-orange-500">{price}</span></h2>
                    <h3 className="my-1 text-xl font-semibold">Category: <span className="font-medium">{category}</span></h3>
                    <h3 className="my-1 text-xl font-semibold">Admin Name: <span className="font-medium">{admin}</span></h3>
                    <h3 className="my-1 text-xl font-semibold">PostTime: <span className="font-medium">{postTime}</span></h3>
                    <h3 className="my-1 text-xl font-semibold">Ingredients: <span className="font-medium">{ingredients}</span></h3>
                    <h3 className="my-1 text-xl font-semibold">Description: <span className="font-medium">{description}</span></h3>
                    <div className="flex flex-row">
                        <h3 className="my-1 mr-2 text-xl font-semibold">Rating:</h3>
                        {Array.from({ length: 5 }).map((_, index) => {
                            if (index < Math.floor(rating)) {
                                return (
                                    <span key={index} className="text-yellow-400 text-2xl">
                                        ★
                                    </span>
                                );
                            } else if (
                                index === Math.floor(rating) &&
                                rating % 1 !== 0
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
                    <h3 className="mb-1 text-xl font-semibold">Like Count: <span className="font-medium">{likes.length}</span></h3>
                    <div className="flex flex-row gap-2 my-4">
                        <h6 className="text-xl font-semibold">Do you like this item? </h6>
                        {liked ? (
                            <FcLike className="text-2xl" />
                        ) : (
                            <FcLikePlaceholder
                                className="text-2xl"
                                onClick={handleLike}

                            />
                        )}
                    </div>
                    <button className="w-2/5 text-base text-white bg-orange-500 normal-case border-orange-600 btn btn-warning">Meal Request</button>
                    <div>
                        <textarea className="w-2/5 h-36 my-2 textarea textarea-warning" placeholder="Share Review"></textarea>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default MealsDetails;