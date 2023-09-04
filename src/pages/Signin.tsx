import React from "react";
import { useNavigate } from "react-router-dom";
import { requestSignin } from "../api/auth";
import { AuthForm } from "../components/AuthForm";

const Signin = () => {
  const navigate = useNavigate();

  const handleSignin = async (
    email: string,
    password: string,
  ): Promise<void> => {
    const data = await requestSignin({ email, password });
    window.localStorage.setItem("accessToken", data.access_token);
    navigate("/todo");
  };

  return (
    <main>
      <h1>로그인 페이지</h1>
      <AuthForm type="signin" onFormSubmit={handleSignin} />
    </main>
  );
};

export default Signin;
