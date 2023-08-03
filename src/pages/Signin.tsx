import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { requestSignin } from "../api/auth";
import { isValidEmail, isValidPwd } from "../utils/auth";

const Signin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSignin = async (): Promise<void> => {
    try {
      const data = await requestSignin({ email, password });
      window.localStorage.setItem("accessToken", data.access_token);
      navigate("/todo");
    } catch (e) {
      console.error(e);
      alert("다시 시도해주시기 바랍니다.");
    }
  };

  const handleEmailVal = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(event.target.value);
  };

  const handlePwdVal = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(event.target.value);
  };

  return (
    <>
      <h1>로그인 페이지</h1>
      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <label htmlFor="email-input">이메일</label>
        <input
          id="email-input"
          data-testid="email-input"
          onChange={handleEmailVal}
        />

        <label htmlFor="password-input">비밀번호</label>
        <input
          id="password-input"
          data-testid="password-input"
          onChange={handlePwdVal}
        />

        <button
          disabled={!isValidEmail(email) || !isValidPwd(password)}
          data-testid="signin-button"
          onClick={handleSignin}
        >
          로그인
        </button>
      </div>
    </>
  );
};

export default Signin;
