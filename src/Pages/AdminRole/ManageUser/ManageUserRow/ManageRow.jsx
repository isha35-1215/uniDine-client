import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const ManageRow = ({ user, refetch }) => {
    const [isMember, setIsMember] = useState([]);

    useEffect(() => {
        fetch(`https://uni-dine-server.vercel.app/payments?email=${user.email}`)
            .then((res) => res.json())
            .then((data) => setIsMember(data));
    }, [user.email]);

    const reversedMember = [...isMember].reverse();
    const firstMember = reversedMember.length > 0 ? reversedMember[0] : null;

    const handleAdmin = user => {

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://uni-dine-server.vercel.app/users/admin/${user._id}`, {
                    method: "PATCH",
                }).then(res => res.json())
                    .then(data => {
                        console.log(data);
                        if (data.modifiedCount > 0) {
                            refetch();
                            Swal.fire(
                                'Congrats!',
                                `${user.name} is admin now!`,
                                'success'
                            );
                        }
                    })
            }
        })



    }

    
    // const [isOne, setIsOne] = useState([]);

    // useEffect(() => {
    //     fetch(`https://uni-dine-server.vercel.app/isOne?email=${user.email}&name=${user.name}`)
    //         .then((res) => res.json())
    //         .then((data) => setIsOne(data));
    // }, [user.email, user.name]);







    return (
        <tr className="grid grid-cols-4">
            <td className="">
                <div className="text-lg font-medium">{user.name}</div>
            </td>
            <td>
                <div className="text-lg font-medium">{user.email}</div>
            </td>
            <td>
                {
                    user.role === "admin" ?  <div className="text-lg font-medium">Admin</div>
                    : 
                    <button onClick={() => handleAdmin(user)} className=" text-white text-3xl btn btn-square">🔃</button>

                }
            </td>
            <td>
                {firstMember ? (
                    <div className="text-lg font-medium">{firstMember.badge}</div>
                ) : (
                    <div className="text-lg font-medium">Bronze</div>
                )}
            </td>
        </tr>
    );
};

export default ManageRow;
