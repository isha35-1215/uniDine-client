import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import Swal from "sweetalert2";

const ReviewCard = ({ item, refetch }) => {

    const { _id, mealID, title, review } = item;

    const [allLikes, setAllLikes] = useState([]);
    console.log(allLikes);
    useEffect(() => {
        fetch(`https://uni-dine-server.vercel.app/likes/${mealID}`)
            .then((res) => res.json())
            .then((data) => setAllLikes(data));
    }, [mealID]);
    console.log(allLikes.length);


    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const review = form.review.value;

        const edited = { review };
        console.log(edited);

        fetch(`https://uni-dine-server.vercel.app/reviews/${_id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(edited)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    swal("Success", "Your review is edited", "success");
                    document.getElementById(`my-modal-${_id}`).close();
                    refetch();
                }
            })
    }


    const handleDelete  =()=> {
        console.log('called', `https://uni-dine-server.vercel.app/delete/${_id}`);

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
                fetch(`https://uni-dine-server.vercel.app/delete/${_id}`, {
                    method: "DELETE",
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        if (data.deletedCount > 0) {
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            );
                            refetch();
                        }
                    })
            }
        })
    }


    return (
        <div>
            <tr className="grid grid-cols-10">
                <td className="col-span-3">
                    <div className="text-lg  font-medium">{title}</div>
                </td>
                <td>
                    <div className="text-lg  font-medium">{allLikes.length}</div>
                </td>
                <td className="col-span-3">
                    <div className="text-lg  font-medium">{review}</div>
                </td>
                <th>
                    <button className="bg-orange-500 text-white text-xl px-6 btn btn-warning" onClick={() => document.getElementById(`my-modal-${_id}`).showModal()}>✎</button>
                    <dialog id={`my-modal-${_id}`} className="modal modal-bottom sm:modal-middle">
                        <div className="modal-box">
                            <form method="dialog">
                                <button className="btn btn-sm btn-circle btn-ghost text-orange-600 font-extrabold text-2xl absolute right-6 top-6">✕</button>
                            </form>
                            <form onSubmit={handleSubmit}>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Edit Review</span>
                                    </label>
                                    <input type="text" name="review" placeholder="" className="input input-bordered border-orange-600 w-full max-w-xs" />
                                </div>
                                <div className="modal-action">
                                    <button type="submit" className="btn btn-secondary bg-orange-500 text-base normal-case text-white px-4">Submit</button>
                                </div>
                            </form>
                        </div>
                    </dialog>
                </th>
                <th>
                    <button onClick={ handleDelete} className="bg-red-700 text-white text-base px-6 btn btn-error">✕</button>
                </th>
                <th>
                    <Link to={`/meal/${mealID}`}>
                    <button className="bg-orange-600  text-2xl btn btn-ghost">👀</button>
                    </Link>
                </th>
            </tr>
            
        </div>
    );
};

export default ReviewCard;