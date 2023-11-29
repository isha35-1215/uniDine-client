import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider/AuthProvider";

const MyProfile = () => {

    const { user } = useContext(AuthContext);

    const [isMember, setIsMember] = useState([]);
    console.log(isMember);

    useEffect(() => {
        fetch(`http://localhost:5000/payments?email=${user?.email}`)
            .then((res) => res.json())
            .then((data) => setIsMember(data));
    }, []);

    // Reverse the array and store the first element in a new variable
    const reversedMember = [...isMember].reverse();
    const firstMember = reversedMember.length > 0 ? reversedMember[0] : null;



    return (
        <div>
            <h1 className='py-8 text-5xl text-center  font-bold'>My Profile</h1>
            <div className="grid grid-cols-2">
                <div className="my-10">
                    <div className="flex flex-row gap-4 mx-6">
                        <div>
                            <img src={user?.photoURL} className="w-72 rounded-lg" />
                        </div>
                        <div className="items-center">
                            <h1 className="pt-6 text-xl  font-semibold">Username:</h1>
                            <h1 className="text-2xl  font-extrabold">{user?.displayName}</h1>
                            <p className="pt-6 text-xl  font-semibold">User Email:</p>
                            <p className="text-2xl font-extrabold">{user?.email}</p>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="m-6 flex flex-row justify-center">

                        <div>
                            {firstMember ? (
                                <div>
                                    <img src={firstMember.img} className="w-56 rounded-lg" />
                                    <h1 className="text-center text-xl font-semibold my-2">Membership: {firstMember.package}</h1>
                                </div>
                            ) :
                                <div>
                                    <img src="https://i.ibb.co/9g5Cd9M/medal-1783069.png" className="w-56" />
                                    <h1 className="text-center text-xl font-semibold my-2">Membership: Bronze</h1>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;