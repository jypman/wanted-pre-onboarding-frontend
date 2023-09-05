import { createBrowserRouter, redirect } from "react-router-dom";
import { ACCESS_TOKEN_KEY } from "../utils/auth";
import Home from "./Home";
import Signup from "./Signup";
import Signin from "./Signin";
import Todo from "./Todo/Todo";

export const redirectDependingOnLogin = async ({
  request,
}: {
  request: Request;
}) => {
  const pathName = new URL(request.url).pathname;
  switch (pathName) {
    case "/signin":
    case "/signup":
      return window.localStorage.getItem(ACCESS_TOKEN_KEY)
        ? redirect("/todo")
        : null;
    case "/todo":
      return window.localStorage.getItem(ACCESS_TOKEN_KEY)
        ? null
        : redirect("/signin");
    default:
      return null;
  }
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/signup",
    loader: redirectDependingOnLogin,
    element: <Signup />,
  },
  {
    path: "/signin",
    loader: redirectDependingOnLogin,
    element: <Signin />,
  },
  {
    path: "/todo",
    loader: redirectDependingOnLogin,
    element: <Todo />,
  },
]);
