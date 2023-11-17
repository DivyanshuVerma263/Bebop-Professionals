import { createBrowserRouter } from "react-router-dom";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import HomeLayout from "../layouts/HomeLayout";
<<<<<<< HEAD
export const router = createBrowserRouter([
=======
import ProfileLayout from "../layouts/ProfileLayout";

export const router = createBrowserRouter([   //routes
>>>>>>> main
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/home",
      element: <HomeLayout />,
    },
<<<<<<< HEAD
=======
    {
      path: "/profile",
      element: <ProfileLayout />,
    },
>>>>>>> main
  ]);