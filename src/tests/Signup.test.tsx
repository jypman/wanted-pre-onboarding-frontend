import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import Signup from "../pages/Signup";
import { MIN_PWD_LENGTH } from "../utils/auth";
import { mockConsoleError, sleep } from "./utils";
import * as auth from "../api/auth";

const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
  useLocation: () => ({ pathname: "/signin" }),
}));
jest.mock("axios", () => ({
  isAxiosError: false,
  create: jest.fn(() => ({
    interceptors: {
      request: {
        use: jest.fn(),
      },
      response: {
        use: jest.fn(),
      },
    },
  })),
}));

describe("회원가입 페이지 테스트", () => {
  mockConsoleError();
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("이메일, 비밀번호, 회원가입 버튼이 렌더링되었다.", () => {
    render(
      <BrowserRouter>
        <Signup />
      </BrowserRouter>,
    );

    expect(screen.getByTestId("email-input")).toBeInTheDocument();
    expect(screen.getByTestId("password-input")).toBeInTheDocument();
    expect(screen.getByTestId("signup-button")).toBeInTheDocument();
  });

  test("이메일의 경우 @가 없으면 유효검사 통과할 수 없다.", async () => {
    render(
      <BrowserRouter>
        <Signup />
      </BrowserRouter>,
    );

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
    render(
      <BrowserRouter>
        <Signup />
      </BrowserRouter>,
    );

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

  test("회원가입 완료 시 로그인 페이지로 이동", async () => {
    render(
      <BrowserRouter>
        <Signup />
      </BrowserRouter>,
    );

    let curUrl: string = "";
    const spyOnSignup = jest.spyOn(auth, "requestSignup");
    spyOnSignup.mockImplementation(async (): Promise<void> => undefined);
    mockedUsedNavigate.mockImplementation((url: string) => {
      curUrl = url;
    });

    userEvent.type(
      await screen.findByLabelText<HTMLInputElement>("이메일"),
      "123456@gmail.com",
    );
    userEvent.type(
      await screen.findByLabelText<HTMLInputElement>("비밀번호"),
      "*".repeat(MIN_PWD_LENGTH),
    );

    userEvent.click(await screen.findByTestId("signup-button"));

    await sleep(200);
    expect(mockedUsedNavigate).toHaveBeenCalled();
    expect(curUrl).toEqual("/signin");
  });
});
