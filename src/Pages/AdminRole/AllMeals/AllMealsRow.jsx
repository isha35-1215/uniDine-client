import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import Swal from "sweetalert2";
import { AuthContext } from "../../Providers/AuthProvider/AuthProvider";

const AllMealsRow = ({ item, refetch }) => {

    const { user } = useContext(AuthContext);
    const Email = user?.email;

    const { _id, title, admin, price, email, img, description, ingredients, time, rating, category } = item;

    const [allLikes, setAllLikes] = useState([]);
    console.log(allLikes);
    useEffect(() => {
        fetch(`https://uni-dine-server.vercel.app/likes/${_id}`)
            .then((res) => res.json())
            .then((data) => setAllLikes(data));
    }, [_id]);
    console.log(allLikes?.length);

    const [matchEmail, setMatchEmail] = useState([]);
    console.log(matchEmail);
    useEffect(() => {
        fetch(`https://uni-dine-server.vercel.app/meal/${_id}`)
            .then((res) => res.json())
            .then((data) => setMatchEmail(data));
    }, [_id]);
    console.log(matchEmail?.length);

    
    const [allReviews, setReviews] = useState([]);
    console.log(allReviews);
    useEffect(() => {
        fetch(`https://uni-dine-server.vercel.app/reviews/${_id}`)
            .then((res) => res.json())
            .then((data) => setReviews(data));
    }, [_id]);
    console.log(allReviews?.length);


    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const price = form.price.value;
        const ingredients = form.ingredients.value;
        const admin = form.admin.value;
        const description = form.description.value;
        const rating = form.rating.value;
        const category = form.category.value;
        const time = form.time.value;
        const img = form.img.value;

        const edited = { price,ingredients,admin, img, description,rating, category,time };
        console.log(edited);

        fetch(`https://uni-dine-server.vercel.app/upmeals/${_id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(edited)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if(email == Email){
                    if (data.modifiedCount > 0) {
                        swal("Success", "Meal Data is Updated Successfully", "success");
                        document.getElementById(`my-modal-${_id}`).close();
                        refetch();
                    }
                }
                else{
                    swal("Oops", "You don't have edit access!!", "error");

                }

            })
    }


    const handleDelete = () => {

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://uni-dine-server.vercel.app/pop/${_id}`, {
                    method: "DELETE",
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        if (data.deletedCount > 0) {
                            refetch();
                            Swal.fire(
                                'Deleted!',
                                'Your Meal has been deleted.',
                                'success'
                            );
                        }
                    })
            }
        })
    }


    return (
        <div>
            <tr className="grid grid-cols-11">
                <td className="col-span-2">
                    <div className="text-lg  font-medium">{title}</div>
                </td>
                <td>
                    <div className="text-lg  font-medium">{allLikes?.length}</div>
                </td>
                <td >
                    <div className="text-lg  font-medium">{allReviews?.length}</div>
                </td>
                <td className="col-span-2">
                    <div className="text-lg  font-medium">{admin}</div>
                </td>
                <td className="col-span-2">
                    <div className="text-lg  font-medium">{email}</div>
                </td>
                <th>
                    <button className="bg-orange-500 text-white text-xl px-4 btn btn-warning" onClick={() => document.getElementById(`my-modal-${_id}`).showModal()}>✎</button>
                    <dialog id={`my-modal-${_id}`} className="modal modal-bottom sm:modal-middle">
                        <div className="modal-box">
                            <form method="dialog">
                                <button className="btn btn-sm btn-circle btn-ghost text-orange-600 font-extrabold text-2xl absolute right-6 top-6">✕</button>
                            </form>
                            <form onSubmit={handleSubmit}>
                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text">Edit Price</span>
                                    </label>
                                    <input type="text" name="price" placeholder="" defaultValue={price} className="input input-bordered border-orange-600 w-full" />
                                </div>

                                
                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text">Ingredients</span>
                                    </label>
                                    <input type="text" name="ingredients" placeholder="Ingredients" defaultValue={ingredients} className="input input-bordered border-orange-600 w-full" />
                                </div>
                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text">Admin Name</span>
                                    </label>
                                    <input type="text" name="admin" placeholder="Admin Name" defaultValue={admin} className="input input-bordered border-orange-600 w-full" />
                                </div>
                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text">Posting Time</span>
                                    </label>
                                    <input type="text" name="time" placeholder="Time" defaultValue={time} className="input input-bordered border-orange-600 w-full" />
                                </div>
                                <div className="form-control w-full ">
                                    <label className="label">
                                        <span className="label-text">Rating*</span>
                                    </label>
                                    <select defaultValue="default" name="rating"
                                        className="select select-bordered w-full">
                                        <option disabled value="default">{rating}</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </select>
                                </div>
                                <div className="form-control w-full ">
                                    <label className="label">
                                        <span className="label-text">Category*</span>
                                    </label>
                                    <select defaultValue="default" name="category"
                                        className="select select-bordered w-full">
                                        <option disabled value="default">{category}</option>
                                        <option value="breakfast">Breakfast</option>
                                        <option value="lunch">Lunch</option>
                                        <option value="dinner">Dinner</option>

                                    </select>
                                </div>
                                <div className="form-control w-full ">
                                    <label className="label">
                                        <span className="label-text">Image*</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Image"
                                        name="img"
                                        defaultValue={img}
                                        className="input input-bordered w-full" />
                                </div>
                                <div className="form-control w-full ">
                                    <label className="label">
                                        <span className="label-text">Description</span>
                                    </label>
                                    <textarea defaultValue={description} name='description' className="textarea textarea-bordered h-20" placeholder="Description"></textarea>
                                   
                                </div>

                                <div className="modal-action">
                                    <button type="submit" className="btn btn-secondary bg-orange-500 text-base normal-case text-white px-4">Submit</button>
                                </div>
                            </form>
                        </div>
                    </dialog>
                </th>
                <th>
                    <button onClick={handleDelete} className="bg-red-700 text-white text-base px-6 btn btn-error">✕</button>
                </th>
                <th>
                    <Link to={`/meal/${_id}`}>
                        <button className="bg-orange-600  text-2xl btn btn-ghost">👀</button>
                    </Link>
                </th>
            </tr>

        </div>
    );
};

export default AllMealsRow;