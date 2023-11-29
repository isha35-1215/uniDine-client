import { useEffect, useState } from "react";
import swal from "sweetalert";

const UpcomingRow = ({ item }) => {
    const { _id, title, img, time, like, review, category, price, description, ingredients, admin, email, rating } = item;

    const mealInfo = { title, img, time, like, review, category, price, description, ingredients, admin, email, rating };

    const [isPosted, setIsPosted] = useState(false);

    const handlePost = () => {
        setIsPosted(true);
        fetch("http://localhost:5000/meals", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(mealInfo),
        }).then(() => {
            swal("Congrats!", "Meal Added Successfully!", "success");
        });
    }

    const [allLikes, setAllLikes] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/likes/${_id}`)
            .then((res) => res.json())
            .then((data) => setAllLikes(data));
    }, [_id]);




    // const [userLikes, setUserLikes] = useState([]);
    // console.log(userLikes);

    // useEffect(() => {
    //     fetch(`http://localhost:5000/likeCount?mealID=${_id}`)
    //         .then((res) => res.json())
    //         .then((data) => setUserLikes(data));
    // }, []);

    // console.log(userLikes?.length);



    return (
        <div>
            <tr className="grid grid-cols-7">
                <td className="">
                    <div className="avatar">
                        <div className="mask mask-squircle w-16 h-16">
                            <img src={img} alt="Avatar Tailwind CSS Component" />
                        </div>
                    </div>
                </td>
                <td className="col-span-3">
                    <div className="text-lg font-medium">{title}</div>
                </td>
                <td>
                    <div className="text-lg font-medium">{allLikes?.length}</div>
                </td>
                <td>
                    {
                        allLikes?.length > 10 ?
                            <div>
                                {
                                    isPosted ? 
                                    <div className="text-lg font-medium">Added</div>

                                    :<button onClick={() => handlePost(item._id)} className="text-white text-base btn btn-warning bg-orange-500">
                                        Production
                                    </button> 
                                }
                            </div>
                            :
                            <div className="text-lg font-medium">Await</div>

                    }
                </td>
            </tr>
        </div>
    );
};

export default UpcomingRow;
