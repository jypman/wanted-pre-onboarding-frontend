import React from "react";
import { useNavigate } from "react-router-dom";
import module from "../styles/Home.module.css";

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <h1>홈페이지</h1>
      <div className={module["buttons-module"]}>
        <button onClick={() => navigate("/signin")}>로그인 페이지</button>
        <button onClick={() => navigate("/signup")}>회원가입 페이지</button>
        <button onClick={() => navigate("/todo")}>todo list 페이지</button>
      </div>
    </>
  );
};

export default Home;
