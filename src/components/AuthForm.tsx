import React, { useState } from "react";
import module from "../styles/Signin.module.css";
import { isValidEmail, isValidPwd } from "../utils/auth";

interface AuthFormProps {
  type: "signin" | "signup";
  onFormSubmit: (email: string, password: string) => void;
}

export const AuthForm = ({ type, onFormSubmit }: AuthFormProps) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const typeEmailVal = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(event.target.value);
  };

  const typePwdVal = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(event.target.value);
  };

  return (
    <section>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onFormSubmit(email, password);
        }}
        className={module["form-module"]}
      >
        <label htmlFor="email-input">이메일</label>
        <input
          id="email-input"
          data-testid="email-input"
          onChange={typeEmailVal}
        />

        <label htmlFor="password-input">비밀번호</label>
        <input
          id="password-input"
          data-testid="password-input"
          onChange={typePwdVal}
        />

        <button
          disabled={!isValidEmail(email) || !isValidPwd(password)}
          data-testid={type === "signin" ? "signin-button" : "signup-button"}
        >
          로그인
        </button>
      </form>
    </section>
  );
};
