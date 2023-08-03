import { createBrowserRouter } from "react-router-dom";
import Signup from "./Signup";
import Signin from "./Signin";
import Todo from "./Todo";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <></>,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/todo",
    element: <Todo />,
  },
]);
