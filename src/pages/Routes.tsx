import { createBrowserRouter } from "react-router-dom";
import Home from "./Home";
import Signup from "./Signup";
import Signin from "./Signin";
import Todo from "./Todo";
import Auth from "./Auth";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/signup",
    element: (
      <Auth>
        <Signup />
      </Auth>
    ),
  },
  {
    path: "/signin",
    element: (
      <Auth>
        <Signin />
      </Auth>
    ),
  },
  {
    path: "/todo",
    element: (
      <Auth>
        <Todo />
      </Auth>
    ),
  },
]);
