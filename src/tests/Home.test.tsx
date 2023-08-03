import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Home from "../pages/Home";

describe("홈 페이지 테스트", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.mock("react-router-dom", () => ({
      ...jest.requireActual("react-router-dom"),
      useNavigate: () => undefined,
    }));
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>,
    );
  });

  test("홈 페이지를 나타내는 문구가 있다.", async () => {
    expect(screen.getByText("홈페이지")).toBeInTheDocument();
  });

  test("로그인, 회원가입, todo list 페이지 이동 버튼이 있다.", () => {
    expect(screen.getByText("로그인 페이지")).toBeInTheDocument();
    expect(screen.getByText("회원가입 페이지")).toBeInTheDocument();
    expect(screen.getByText("todo list 페이지")).toBeInTheDocument();
  });
});
