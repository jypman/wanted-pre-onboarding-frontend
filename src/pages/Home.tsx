import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <h1>홈페이지</h1>
      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <button onClick={() => navigate("/signin")}>로그인 페이지</button>
        <button onClick={() => navigate("/signup")}>회원가입 페이지</button>
        <button onClick={() => navigate("/todo")}>todo list 페이지</button>
      </div>
    </>
  );
};

export default Home;
