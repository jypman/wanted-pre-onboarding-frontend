import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { requestSignup } from "../api/auth";
import { isValidEmail, isValidPwd } from "../utils/auth";
import module from "../styles/Signup.module.css";

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSignUp = async (): Promise<void> => {
    try {
      await requestSignup({ email, password });
      navigate("/signin");
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
      <h1>회원가입 페이지</h1>
      <div className={module["form-module"]}>
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
          data-testid="signup-button"
          onClick={handleSignUp}
        >
          회원가입
        </button>
      </div>
    </>
  );
};

export default Signup;
