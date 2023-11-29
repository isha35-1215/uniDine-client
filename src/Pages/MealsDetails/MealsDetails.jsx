import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Providers/AuthProvider/AuthProvider";
import swal from "sweetalert";
import useLike from "../../hooks/useLike";


const MealsDetails = () => {

    const mealData = useLoaderData();
    const { _id, title, img, rating, price, category, admin, description, ingredients, time } = mealData;
    const { user } = useContext(AuthContext);
    const email = user?.email;
    const name = user?.displayName;
    const navigate = useNavigate();
    const location = useLocation();


    //fetch reviews
    const fetchAllReviews = () => {
        fetch(`http://localhost:5000/reviews/${_id}`)
            .then((res) => res.json())
            .then((data) => setAllReviews(data));
    };

    //submit reviews
    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const review = form.review.value;
        const email = form.email.value;
        const reviewData = { mealID: _id, title, review, email };

        fetch("http://localhost:5000/reviews", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(reviewData),
        })
            .then((result) => {
                console.log(result);
                console.log(reviewData);
                swal("Congrats!!", "Thanks for Sharing Your Feedback!", "success");
                // After posting a review, fetch all reviews to update the list
                fetchAllReviews();
            });
    };

    // refetch all reviews
    useEffect(() => {
        fetchAllReviews();
    }, [_id]);


    //fetch/get likes count
    const [allReviews, setAllReviews] = useState([]);
    console.log(allReviews);

    useEffect(() => {
        fetch(`http://localhost:5000/reviews/${_id}`)
            .then((res) => res.json())
            .then((data) => setAllReviews(data));
    }, [_id]);

    const [like] = useLike();
    console.log(like);


    //checking user already isLiked 
    const [liked, setLiked] = useState(false);

    const fetchAllLikes = () => {
        fetch(`http://localhost:5000/likes/${_id}`)
            .then((res) => res.json())
            .then((data) => setAllLikes(data));
    };

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
                fetchAllLikes();
            });
        } else {
            swal("You are not currently logged in!", "Log in first", "error").then(() => {
                navigate("/login", { state: { from: location?.state ? location.state : "/" } });
            });
        }
    };

    // refetch all likes
    useEffect(() => {
        fetchAllLikes();
    }, [_id]);


    //fetching liked data
    const [allLikes, setAllLikes] = useState([]);
    console.log(allLikes);

    useEffect(() => {
        fetch(`http://localhost:5000/likes/${_id}`)
            .then((res) => res.json())
            .then((data) => setAllLikes(data));
    }, [_id]);
    console.log(allLikes.length);


    //check is member / package holder
    const [isMember, setIsMember] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:5000/payment?email=${email}`)
            .then((res) => res.json())
            .then((data) => setIsMember(data));
    }, [email]);

    console.log(isMember);

    //handle meal request condition
    const likeCount = allLikes.length;
    const reviewCount = allReviews.length;
    const orderData = { title, likeCount, reviewCount, status: 'pending', mealID:_id, email: email, name:name }

    const handleReq = () => {
        if (!user) {
            swal("You are not currently logged in!", "Log in first", "error");
        }
        else if (!isMember) {
            swal("You aren't package holder", "Purchase package to eat!", "error");
        }
        else {
            fetch("http://localhost:5000/orders", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(orderData),
            }).then(() => {
                swal("Congrats!", "Meal Request Placed Successfully!", "success");
            });
        }
    };




    return (
        <div>
            <div className="max-w-full mx-auto rounded-md bg-cover bg-center">
                <img src={img} alt={title} className="w-full max-h-[450px] bg-cover" />
                <div className="max-w-6xl mx-auto my-10">
                    <h1 className="text-3xl font-bold my-2">Item: {title}</h1>
                    <h2 className="text-2xl font-semibold my-2">Price: <span className="text-orange-500">${price}</span></h2>
                    <h3 className="my-1 text-xl font-semibold">Category: <span className="font-medium">{category}</span></h3>
                    <h3 className="my-1 text-xl font-semibold">Admin Name: <span className="font-medium">{admin}</span></h3>
                    <h3 className="my-1 text-xl font-semibold">PostTime: <span className="font-medium">{time}</span></h3>
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
                    <h3 className="mb-1 text-xl font-semibold">Like Count: <span className="font-medium">{likeCount}</span></h3>
                    <div className="flex flex-row gap-2 my-4">
                        <h6 className="text-xl font-semibold">Do you like this item? </h6>
                        {like.length || liked ? (
                            <FcLike className="text-2xl" />

                        ) : (
                            <FcLikePlaceholder
                                className="text-2xl"
                                onClick={handleLike}
                            />
                        )}
                    </div>
                    <button onClick={handleReq} className="w-2/5 text-base text-white bg-orange-500 normal-case border-orange-600 btn btn-warning">Meal Request</button>
                    {user ? <form onSubmit={handleSubmit} className="flex flex-col my-4">
                        <div className="form-control flex flex-row w-2/5">
                            <input type="text" name="email" defaultValue={user?.email} placeholder="" className="invisible" />
                        </div>
                        <textarea className="w-2/5 h-36 textarea textarea-warning rounded-b-none" placeholder="Share Review" name="review"></textarea>
                        <button type="submit" className="w-2/5 bg-orange-500 rounded-t-none text-white normal-case btn btn-warning">Share</button>
                    </form> :
                        <h1 className="my-6 font-semibold text-2xl text-orange-600">Please login to share your feedback.</h1>
                    }

                    <div>
                        <h1 className="font-semibold text-2xl text-orange-600">See All Reviews: {reviewCount}</h1>
                        <div className="my-2">
                            {
                                allReviews.map((reviews) => {
                                    return (
                                        <div key={reviews._id} className="my-2">
                                            <p className="text-xl font-semibold ">Posted by: <span className=" font-normal"> {reviews.email}</span></p>
                                            <p className="text-xl font-semibold ">Review: <span className="font-normal"> {reviews.review}</span></p>
                                        </div>

                                    )
                                })

                            }
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default MealsDetails;