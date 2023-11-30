import { Link } from "react-router-dom";
import swal from "sweetalert";

const ServeRow = ({ item, refetch }) => {

    const { _id, mealID, name, title, email,status } = item;

    const handleUpdate  =(_id)=> {

        console.log(_id);
        const status = 'delivered';

        fetch(`https://uni-dine-server.vercel.app/status/${_id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({status})
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    refetch();
                    swal("Success", "Order is Served!", "success");
                }
            })
    }

    const handleServed  =()=> {
        swal("Oops!", "Already Served!", "error");

    }


    return (
        <div>
            <tr className="grid grid-cols-10">
                <td className="col-span-3">
                    <div className="text-lg  font-medium">{title}</div>
                </td>
                <td className="col-span-3">
                    <div className="text-lg  font-medium">{email}</div>
                </td>
                <td className="col-span-2">
                    <div className="text-lg  font-medium">{name}</div>
                </td>
                
                <th>
                    {
                        status == 'pending' ? 
                        <div className="text-lg  font-medium">{status}</div>
                        :   <div className="text-lg  font-medium">Delivered</div>
                    }
                </th>
                <th>
                    {
                        status == 'delivered' ?
                        <button onClick={handleServed} className="bg-orange-200 text-base btn btn-ghost">Serve</button>

                        : 
                        <button onClick={ ()=> handleUpdate(_id)} className="bg-orange-600  text-base btn btn-ghost">Serve</button>

                    }
                </th>
            </tr>
            
        </div>
    );
};

export default ServeRow;