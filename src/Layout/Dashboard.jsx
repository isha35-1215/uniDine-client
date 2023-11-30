import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import { useContext } from "react";
import { AuthContext } from "../Pages/Providers/AuthProvider/AuthProvider";

const Dashboard = () => {

    const [isAdmin] = useAdmin();
    console.log(isAdmin);

    const {logOut} = useContext(AuthContext);
    const handleSignOut = () => {
        logOut()
            .then()
            .catch()
    }

    return (
        <div className="flex font-poppins">

            <div className="w-64 min-h-screen bg-orange-500">
                <ul className="menu text-xl bg-inherit text-white font-semibold">
                    <a className="btn btn-ghost normal-case invisible lg:visible  my-4  text-3xl font-bold">
                        <img className='w-[40px] h-[40px] rounded-full' src="https://i.ibb.co/6BqRzGh/food-3745531.png" alt="icon1" border="0" />UniDine</a>
                    {
                        isAdmin ?
                            <>
                                <li><NavLink to={"/dashboard/adminProfile"}>Admin Profile</NavLink></li>
                                <li><NavLink to={"/dashboard/manageUsers"}>Manage Users</NavLink></li>
                                <li><NavLink to={"/dashboard/addMeals"}>Add Meals</NavLink></li>
                                <li><NavLink to={"/dashboard/allMeals"}>All Meals</NavLink></li>
                                <li><NavLink to={"/dashboard/allReviews"}>All Reviews</NavLink></li>
                                <li><NavLink to={"/dashboard/serveMeals"}>Serve Meals</NavLink></li>
                                <li><NavLink to={"/dashboard/upcomingMeals"}>Upcoming Meals</NavLink></li>
                            </> :
                            <>
                                <li><NavLink to={"/dashboard/myProfile"}>My Profile</NavLink></li>
                                <li><NavLink to={"/dashboard/myRequestedMeals"}>My Requested Meals</NavLink></li>
                                <li><NavLink to={"/dashboard/myReviews"}>My Reviews</NavLink></li>
                                <li><NavLink to={"/upcomingMeal"}>Upcoming Meals</NavLink></li>

                            </>
                    }
                    <div className="divider"></div>
                    <li><NavLink to={"/"}>Home</NavLink></li>
                    <li><NavLink to={"/meals"}>Meals</NavLink></li>
                    <li><button onClick={handleSignOut}>logout</button></li>

                </ul>
            </div>
            <div className="flex-1">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;