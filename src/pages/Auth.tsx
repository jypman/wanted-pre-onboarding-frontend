import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
interface AuthProviderProps {
  children: React.ReactElement;
}

const Auth = ({ children }: AuthProviderProps) => {
  const navigation = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    switch (pathname) {
      case "/signin":
      case "/signup":
        if (window.localStorage.getItem("accessToken")) {
          navigation("/todo");
          break;
        }
        break;
      case "/todo":
        if (!window.localStorage.getItem("accessToken")) {
          navigation("/signin");
          break;
        }
        break;
      default:
        break;
    }
  }, []);
  return <>{children}</>;
};

export default Auth;
