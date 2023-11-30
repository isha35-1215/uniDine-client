import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider/AuthProvider";

const AdminProfile = () => {

    const { user } = useContext(AuthContext);
    const Email = user?.email;

   

    const [allMeals, setAllMeals] = useState();

    useEffect(() => {
        fetch(`https://uni-dine-server.vercel.app/meal?email=${Email}`)
            .then((res) => res.json())
            .then((data) => setAllMeals(data));
    }, [Email]);

    console.log(allMeals?.length);

    return (
        <div className="mt-10">
            <h1 className='py-10 text-4xl text-center font-bold'>My Profile</h1>
                <div className="flex flex-row gap-20 mx-48 my-10">
                    <div>
                        <img src={user?.photoURL} className="w-72 rounded-lg shadow-2xl" />
                    </div>
                    <div className="items-center">
                        <h1 className="pt-10 text-xl font-semibold">Username:</h1>
                        <h1 className="text-2xl font-extrabold">{user?.displayName}</h1>
                        <p className="pt-10 text-xl font-semibold">User Email:</p>
                        <p className="text-2xl font-extrabold">{user?.email}</p>
                    </div>
                </div>
                <h1 className='py-10 text-4xl text-center font-bold'>Meals Added by Me: {allMeals?.length}</h1>
        </div>
    );
};

export default AdminProfile;