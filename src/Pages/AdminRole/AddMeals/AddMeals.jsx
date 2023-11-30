import { useForm } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider/AuthProvider";
import swal from "sweetalert";


const AddMeals = () => {
    const { register, handleSubmit } = useForm();
    const { user } = useContext(AuthContext);

    const handleAdd= async(data)=> {
        console.log("add");
        console.log(data);
        const mealInfo = {
            title: data.title,
            category: data.category,
            img: data.img,
            ingredients: data.ingredients,
            description: data.description,
            price: data.price,
            rating: data.rating,
            time: data.time,
            likes: data.likes,
            review: data.review,
            admin: data.name,
            email: data.email
        }

        fetch("https://uni-dine-server.vercel.app/meals", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(mealInfo),
        }).then(() => {
            swal("Congrats!", "Meal Added Successfully!", "success");
        });
    }

    const handleUpcoming = async(data)=> {
        console.log("upcoming");
        console.log(data);

        const mealInfo = {
            title: data.title,
            category: data.category,
            img: data.img,
            ingredients: data.ingredients,
            description: data.description,
            price: data.price,
            rating: data.rating,
            time: data.time,
            likes: data.likes,
            review: data.review,
            admin: data.name,
            email: data.email
        }

        fetch("https://uni-dine-server.vercel.app/upcomings", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(mealInfo),
        }).then(() => {
            swal("Congrats!", "Upcoming Meal Added Successfully!", "success");
        });
    }


    // const onSubmit = async (data) => {
    //     console.log(data)
    //     return;
    // };

    return (
        <div>
            <h1 className='py-4 text-3xl text-center  font-bold'>Add Meals</h1>
            <div className="mx-16">
                <form >

                    <div className="flex gap-6">

                        {/* title */}
                        <div className="form-control w-full ">
                            <label className="label">
                                <span className="label-text">Title*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Title"
                                {...register('title', { required: true })}
                                className="input input-bordered w-full" />
                        </div>

                        {/* category */}
                        <div className="form-control w-full ">
                            <label className="label">
                                <span className="label-text">Category*</span>
                            </label>
                            <select defaultValue="default" {...register('category', { required: true })}
                                className="select select-bordered w-full">
                                <option disabled value="default">Select a category</option>
                                <option value="breakfast">Breakfast</option>
                                <option value="lunch">Lunch</option>
                                <option value="dinner">Dinner</option>

                            </select>
                        </div>
                    </div>
                    <div className="flex gap-6">
                        {/* image */}
                        <div className="form-control w-full ">
                            <label className="label">
                                <span className="label-text">Image*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Image"
                                {...register('img', { required: true })}
                                className="input input-bordered w-full" />
                        </div>

                        {/* price */}
                        <div className="form-control w-full ">
                            <label className="label">
                                <span className="label-text">Price*</span>
                            </label>
                            <input
                                type="number"
                                placeholder="Price"
                                {...register('price', { required: true })}
                                className="input input-bordered w-full" />
                        </div>

                    </div>

                    <div className="flex gap-6">
                        {/* Time */}
                        <div className="form-control w-full ">
                            <label className="label">
                                <span className="label-text">Time*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Time"
                                {...register('time', { required: true })}
                                className="input input-bordered w-full" />
                        </div>
                        {/* Likes */}
                        <div className="form-control w-full ">
                            <label className="label">
                                <span className="label-text">Likes*</span>
                            </label>
                            <input
                                type="number"
                                defaultValue={0}
                                {...register('likes', { required: true })}
                                className="input input-bordered w-full" />
                        </div>

                    </div>
                    <div className="flex gap-6">
                        {/* review */}
                        <div className="form-control w-full ">
                            <label className="label">
                                <span className="label-text">Reviews*</span>
                            </label>
                            <input
                                type="text"
                                defaultValue={0}
                                {...register('review', { required: true })}
                                className="input input-bordered w-full" />
                        </div>
                        {/* Rating */}
                        <div className="form-control w-full ">
                            <label className="label">
                                <span className="label-text">Rating*</span>
                            </label>
                            <select defaultValue="default" {...register('rating', { required: true })}
                                className="select select-bordered w-full">
                                <option disabled value="default">Select a Rating</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </div>

                    </div>
                    <div className="flex gap-6">
                        {/* Admin Name */}
                        <div className="form-control w-full ">
                            <label className="label">
                                <span className="label-text">Admin Name*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Admin Name"
                                defaultValue={user?.displayName}
                                {...register('name', { required: true })}
                                className="input input-bordered w-full" />
                        </div>
                        {/* Admin Email */}
                        <div className="form-control w-full ">
                            <label className="label">
                                <span className="label-text">Admin Email*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Admin Email"
                                defaultValue={user?.email}
                                {...register('email', { required: true })}
                                className="input input-bordered w-full" />
                        </div>

                    </div>
                    <div className="flex gap-6">
                        {/* ingredients */}
                        <div className="form-control w-full ">
                            <label className="label">
                                <span className="label-text">Ingredients*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Ingredients"
                                {...register('ingredients', { required: true })}
                                required
                                className="input input-bordered w-full" />
                        </div>
                    </div>
                    {/* Descriptions */}
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">Description*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Description"
                            {...register('description', { required: true })}
                            required
                            className="input input-bordered w-full" />
                    </div>
                    <div className="flex flex-row justify-between gap-6 my-4">
                        <button onClick={handleSubmit(handleAdd)} className="btn btn-warning bg-orange-500 text-base w-1/2">
                            Add Item 
                        </button>
                        <button onClick={handleSubmit(handleUpcoming)} className="btn btn-warning bg-orange-500 text-base mr-12 w-1/2">
                            Add Upcoming Meals
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default AddMeals;