import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import Signin from "../pages/Signin";
import { MIN_PWD_LENGTH } from "../utils/auth";
import { mockConsoleError } from "./utils";
import * as auth from "../api/auth";

describe("로그인 페이지 테스트", () => {
  beforeEach(() => {
    mockConsoleError();
    jest.clearAllMocks();
    jest.mock("react-router-dom", () => ({
      ...jest.requireActual("react-router-dom"),
      useNavigate: () => undefined,
    }));
    render(
      <BrowserRouter>
        <Signin />
      </BrowserRouter>,
    );
  });

  test("이메일, 비밀번호, 회원가입 버튼이 렌더링되었다.", () => {
    expect(screen.getByTestId("email-input")).toBeInTheDocument();
    expect(screen.getByTestId("password-input")).toBeInTheDocument();
    expect(screen.getByTestId("signin-button")).toBeInTheDocument();
  });

  test("이메일의 경우 @가 없으면 유효검사 통과할 수 없다.", async () => {
    userEvent.type(
      await screen.findByLabelText<HTMLInputElement>("이메일"),
      "123456@gmail.com".replace(/@/g, ""),
    );
    userEvent.type(
      await screen.findByLabelText<HTMLInputElement>("비밀번호"),
      "*".repeat(MIN_PWD_LENGTH),
    );
    expect(screen.getByTestId("signin-button")).toBeDisabled();
  });

  test("비밀번호의 경우 8자 미만이면 유효검사 통과할 수 없다.", async () => {
    userEvent.type(
      await screen.findByLabelText<HTMLInputElement>("이메일"),
      "123456@gmail.com",
    );
    userEvent.type(
      await screen.findByLabelText<HTMLInputElement>("비밀번호"),
      "*".repeat(MIN_PWD_LENGTH - 1),
    );
    expect(screen.getByTestId("signin-button")).toBeDisabled();
  });
});
