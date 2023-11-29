import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider/AuthProvider";

const AdminProfile = () => {

    const { user, logOut } = useContext(AuthContext);
    const Email = user?.email;

    const handleSignOut = () => {
        logOut()
            .then()
            .catch()
    }

    const [allMeals, setAllMeals] = useState();

    useEffect(() => {
        fetch(`http://localhost:5000/meal?email=${Email}`)
            .then((res) => res.json())
            .then((data) => setAllMeals(data));
    }, [Email]);

    console.log(allMeals?.length);

    return (
        <div className="mt-10">
            <h1 className='py-10 text-4xl text-center font-bold'>My Profile</h1>
                <div className="flex flex-row gap-20 mx-72 my-10">
                    <div>
                        <img src={user?.photoURL} className="w-72 rounded-lg shadow-2xl" />
                    </div>
                    <div className="items-center">
                        <h1 className=" text-xl font-semibold">Username:</h1>
                        <h1 className="text-2xl font-extrabold">{user?.displayName}</h1>
                        <p className="pt-6 text-xl font-semibold">User Email:</p>
                        <p className="text-2xl font-extrabold">{user?.email}</p>
                        <button onClick={handleSignOut} className='mt-6 btn btn-warning text-white text-lg bg-orange-500  normal-case'>Sign Out</button>
                    </div>
                </div>
                <h1 className='py-10 text-4xl text-center font-bold'>Meals Added by Me: {allMeals?.length}</h1>
        </div>
    );
};

export default AdminProfile;