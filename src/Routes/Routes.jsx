import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/JoinUs/Login/Login";
import Register from "../Pages/JoinUs/Register/Register";
import Meals from "../Pages/Meals/Meals";
import MealsDetails from "../Pages/MealsDetails/MealsDetails";
import MyReviews from "../Pages/UserDashboard/MyReviews/MyReviews";
import MyProfile from "../Pages/UserDashboard/MyProfile/MyProfile";
import Checkout from "../Pages/Home/Checkout/Checkout";
import PrivateRoute from "../Pages/Providers/PrivateRoute/PrivateRoute";
import MyOrder from "../Pages/UserDashboard/MyOrder/MyOrder";
import Dashboard from "../Layout/Dashboard";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import ManageUsers from "../Pages/AdminRole/ManageUser/ManageUsers/ManageUsers";
import AdminProfile from "../Pages/AdminRole/AdminProfile/AdminProfile";
import AdminRoutes from "./AdminRoutes";
import AddMeals from "../Pages/AdminRole/AddMeals/AddMeals";
import AllMeals from "../Pages/AdminRole/AllMeals/AllMeals";
import ServeMeals from "../Pages/AdminRole/ServeMeals/ServeMeals";
import UpcomingMeals from "../Pages/AdminRole/UpcomingMeals/UpcomingMeals";
import AllReviews from "../Pages/AdminRole/AllReviews/AllReviews";
import IsUpcoming from "../Pages/IsUpcoming/IsUpcoming";


const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      errorElement: <ErrorPage></ErrorPage>,
      children: [
        {
            path: '/',
            element: <Home></Home>
        },
        {
            path: '/meals',
            element: <Meals></Meals>
        },
        {
            path: '/meal/:id',
            element: <MealsDetails></MealsDetails>,
            loader: ({params}) => fetch(`http://localhost:5000/mealDetails/${params.id}`)

        },
        {
            path: '/checkout/:name',
            element: <PrivateRoute><Checkout></Checkout></PrivateRoute>,
            loader: ({params}) => fetch(`http://localhost:5000/checkout/${params.name}`)

        },
        {
            path: '/upcomingMeal',
            element: <IsUpcoming></IsUpcoming>,
            loader: ({params}) => fetch(`http://localhost:5000/upcomings/${params.id}`)


        },
        {
          path: '/login',
          element: <Login></Login>
        },
        {
          path: '/register',
          element: <Register></Register>
        }
      ]
    },
    {
      path: 'dashboard',
      element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
      errorElement: <ErrorPage></ErrorPage>,
      children: [
        {
          path: 'myReviews',
          element: <MyReviews></MyReviews>
        },
        {
          path: 'myProfile',
          element: <MyProfile></MyProfile>
        },
        {
          path: 'myRequestedMeals',
          element: <MyOrder></MyOrder>
        },

        //admin only Routes
        {
          path: 'manageUsers',
          element: <AdminRoutes><ManageUsers></ManageUsers></AdminRoutes>
        },
        {
          path: 'adminProfile',
          element: <AdminRoutes><AdminProfile></AdminProfile></AdminRoutes>
        },
        {
          path: 'addMeals',
          element: <AdminRoutes><AddMeals></AddMeals></AdminRoutes>
        },
        {
          path: 'allMeals',
          element: <AdminRoutes><AllMeals></AllMeals></AdminRoutes>
        },
        {
          path: 'allReviews',
          element: <AdminRoutes><AllReviews></AllReviews></AdminRoutes>
        },
        {
          path: 'serveMeals',
          element: <AdminRoutes><ServeMeals></ServeMeals></AdminRoutes>
        },
        {
          path: 'upcomingMeals',
          element: <AdminRoutes><UpcomingMeals></UpcomingMeals></AdminRoutes>
        }
      ]
    }
  ]);


  export default router;