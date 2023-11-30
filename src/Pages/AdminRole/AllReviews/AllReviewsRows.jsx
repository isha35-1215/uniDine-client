import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import Swal from "sweetalert2";

const AllReviewsRows = ({ item, refetch }) => {

    const { _id, mealID, title, review } = item;

    const [allLikes, setAllLikes] = useState([]);
    console.log(allLikes);
    useEffect(() => {
        fetch(`https://uni-dine-server.vercel.app/likes/${mealID}`)
            .then((res) => res.json())
            .then((data) => setAllLikes(data));
    }, [mealID]);
    console.log(allLikes.length);


    

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
            <tr className="grid grid-cols-9">
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

export default AllReviewsRows;