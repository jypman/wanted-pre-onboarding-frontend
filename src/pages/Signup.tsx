import React from "react";
import { useNavigate } from "react-router-dom";
import { requestSignup } from "../api/auth";
import { AuthForm } from "../components/AuthForm";

const Signup = () => {
  const navigate = useNavigate();

  const handleSignUp = async (
    email: string,
    password: string,
  ): Promise<void> => {
    await requestSignup({ email, password });
    navigate("/signin");
  };

  return (
    <>
      <h1>회원가입 페이지</h1>
      <AuthForm type="signup" onFormSubmit={handleSignUp} />
    </>
  );
};

export default Signup;
