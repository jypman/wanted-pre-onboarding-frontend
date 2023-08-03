import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import Signup from "../pages/Signup";
import { MIN_PWD_LENGTH } from "../utils/auth";
import { mockConsoleError } from "./utils";

describe("회원가입 페이지 테스트", () => {
  beforeEach(() => {
    mockConsoleError();
    jest.clearAllMocks();
    jest.mock("react-router-dom", () => ({
      ...jest.requireActual("react-router-dom"),
      useNavigate: () => undefined,
    }));
    render(
      <BrowserRouter>
        <Signup />
      </BrowserRouter>,
    );
  });

  test("이메일, 비밀번호, 회원가입 버튼이 렌더링되었다.", () => {
    expect(screen.getByTestId("email-input")).toBeInTheDocument();
    expect(screen.getByTestId("password-input")).toBeInTheDocument();
    expect(screen.getByTestId("signup-button")).toBeInTheDocument();
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
    expect(screen.getByTestId("signup-button")).toBeDisabled();
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
    expect(screen.getByTestId("signup-button")).toBeDisabled();
  });
});
