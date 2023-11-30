import Swal from "sweetalert2";

const MyOrderRow = ({ order, refetch }) => {

    const { _id,title, likeCount, reviewCount, status } = order;

    

    const handleDelete  =()=> {
        console.log('called', `https://uni-dine-server.vercel.app/cancel/${_id}`);

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
                fetch(`https://uni-dine-server.vercel.app/cancel/${_id}`, {
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
            <tr className="grid grid-cols-6">
                <td className="col-span-2">
                    <div className="text-lg  font-medium">{title}</div>
                </td>
                <td>
                    <div className="text-lg  font-medium">{likeCount}</div>
                </td>
                <td>
                    <div className="text-lg  font-medium">{reviewCount}</div>
                </td>
                <td>
                    <div className="text-lg  font-medium">{status}</div>
                </td>
                <td>
                    <button onClick={handleDelete} className="bg-red-700 text-white text-base px-6 btn btn-error">✕</button>
                </td>
            </tr>
        </div>
    );
};

export default MyOrderRow;