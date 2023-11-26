import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/JoinUs/Login/Login";
import Register from "../Pages/JoinUs/Register/Register";
import Meals from "../Pages/Meals/Meals";
import MealsDetails from "../Pages/MealsDetails/MealsDetails";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
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
            path: '/meals/:id',
            element: <MealsDetails></MealsDetails>,
            loader: ({params}) => fetch(`http://localhost:5000/mealDetails/${params.id}`)

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
  ]);


  export default router;