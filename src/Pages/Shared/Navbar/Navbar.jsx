import { Link, NavLink } from "react-router-dom";
import { MdDarkMode, MdNotificationsActive } from "react-icons/md";
import { useContext, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider/AuthProvider";


const Navbar = () => {

    const { user, logOut } = useContext(AuthContext);
    const [theme, setTheme] = useState("light");

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        document.documentElement.setAttribute("data-theme", newTheme);
    };

    const handleSignOut = () => {
        logOut()
            .then()
            .catch()
    }

    const navLinks = <>

        <li><NavLink to="/" className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ?
                "text-orange-600 text-base font-bold underline" : ""
        }>Home</NavLink></li>
        <li><NavLink to="/meals" className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ?
                "text-orange-600 text-base font-bold underline" : ""
        }>Meals</NavLink></li>
        <li><NavLink to="/upcomingMeal" className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ?
                "text-orange-600 text-base font-bold underline" : ""
        }>Upcoming Meals</NavLink></li>

        <li>{user ?
            <button onClick={handleSignOut} className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ?
                    "text-orange-600 text-lg font-bold underline" : ""
            }>LogOut</button>
            : <NavLink to="/login" className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ?
                    "text-orange-600 text-lg font-bold underline" : ""
            }>JoinUs</NavLink>}</li>
    </>
    return (
        <>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {navLinks}
                        </ul>
                    </div>
                    <a className="btn btn-ghost normal-case invisible lg:visible  text-orange-600  text-3xl font-bold">
                        <img className='w-[40px] h-[40px] rounded-full' src="https://i.ibb.co/6BqRzGh/food-3745531.png" alt="icon1" border="0" />DashDine</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navLinks}
                    </ul>
                </div>
                <div className="navbar-end gap-1 ">
                    <MdDarkMode className="text-4xl" onClick={toggleTheme}></MdDarkMode>

                    <Link to={'/'}>
                        <button className="btn">
                            <MdNotificationsActive className="text-2xl" />
                            <div className="badge badge-warning">+99</div>
                        </button>
                    </Link>

                    
                    {user && <div className="dropdown dropdown-end">
                        <label tabIndex={0}><img className='rounded-full w-12 h-12 ' src={user?.photoURL} alt="" /></label>
                        <ul tabIndex={0} className="dropdown-content z-[1] menu shadow bg-base-100 rounded-box w-52">
                            <li className="pl-4">{user?.displayName}</li>
                            <li><NavLink to={'/dashboard'}>Dashboard</NavLink></li>
                        </ul>
                    </div>}

                </div>
            </div>
        </>
    );
};

export default Navbar;