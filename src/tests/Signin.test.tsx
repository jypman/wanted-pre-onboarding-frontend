import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import Signin from "../pages/Signin";
import { MIN_PWD_LENGTH } from "../utils/auth";
import { mockConsoleError, sleep } from "./utils";
import * as auth from "../api/auth";
import Auth from "../pages/Auth";

const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
  useLocation: () => ({ pathname: "/signin" }),
}));

describe("로그인 페이지 테스트", () => {
  mockConsoleError();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("이메일, 비밀번호, 회원가입 버튼이 렌더링되었다.", () => {
    render(
      <BrowserRouter>
        <Signin />
      </BrowserRouter>,
    );
    expect(screen.getByTestId("email-input")).toBeInTheDocument();
    expect(screen.getByTestId("password-input")).toBeInTheDocument();
    expect(screen.getByTestId("signin-button")).toBeInTheDocument();
  });

  test("이메일의 경우 @가 없으면 유효검사 통과할 수 없다.", async () => {
    render(
      <BrowserRouter>
        <Signin />
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
    expect(screen.getByTestId("signin-button")).toBeDisabled();
  });

  test("비밀번호의 경우 8자 미만이면 유효검사 통과할 수 없다.", async () => {
    render(
      <BrowserRouter>
        <Signin />
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
    expect(screen.getByTestId("signin-button")).toBeDisabled();
  });

  test("로그인 완료 시 localstorage에 엑세스 토큰 저장 후 todo list페이지로 이동", async () => {
    render(
      <BrowserRouter>
        <Signin />
      </BrowserRouter>,
    );

    let localStorage: { [key: string]: string } = {};
    let curUrl = "";
    Storage.prototype.setItem = jest.fn((key: string, val: string) => {
      localStorage[key] = val;
    });

    const spyOnLogin = jest.spyOn(auth, "requestSignin");
    spyOnLogin.mockImplementation(
      async (): Promise<auth.IResSignin> => ({
        access_token: "mockAccessToken",
      }),
    );
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
    userEvent.click(await screen.findByTestId("signin-button"));

    await sleep(200);

    expect(localStorage).toEqual({ accessToken: "mockAccessToken" });
    expect(mockedUsedNavigate).toHaveBeenCalled();
    expect(curUrl).toEqual("/todo");
  });

  test("로그인한 상태에서 로그인 페이지 진입 시 todo list 페이지로 이동", async () => {
    let curUrl: string = "";
    let store: { [key: string]: string } = {
      accessToken: "mockAccessToken",
    };
    Storage.prototype.getItem = jest.fn((key: string) => {
      return store[key];
    });
    mockedUsedNavigate.mockImplementation((url: string) => {
      curUrl = url;
    });

    render(
      <BrowserRouter>
        <Auth>
          <Signin />
        </Auth>
      </BrowserRouter>,
    );

    expect(curUrl).toEqual("/todo");
  });
});
