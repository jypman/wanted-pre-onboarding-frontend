import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Todo from "../pages/Todo";
import * as remotes from "../api/todo";
import { mockConsoleError, sleep } from "./utils";
import exp from "constants";

describe("todo list 페이지 테스트", () => {
  mockConsoleError();
  beforeEach(() => {
    jest.clearAllMocks();
    const spyOnGet = jest.spyOn(remotes, "requestToGetTodo");
    spyOnGet.mockImplementation(
      async (): Promise<remotes.IResTodo[]> => [
        {
          id: 1,
          todo: "리액트 hook 배우기",
          isCompleted: false,
          userId: 12,
        },
      ],
    );
    render(<Todo />);
  });

  test("새로운 todo를 작성할 input과 추가할 button이 있다.", () => {
    expect(screen.getByTestId("new-todo-input")).toBeInTheDocument();
    expect(screen.getByTestId("new-todo-add-button")).toBeInTheDocument();
  });

  test("todo 추가 버튼을 누르면 todo가 늘어난다.", async () => {
    const newTodo = "리액트 context 배우기";
    const spyOnCreate = jest.spyOn(remotes, "requestToCreateTodo");
    spyOnCreate.mockImplementation(
      async (): Promise<remotes.IResTodo> => ({
        id: 2,
        todo: newTodo,
        isCompleted: false,
        userId: 12,
      }),
    );
    userEvent.type(
      await screen.findByLabelText<HTMLInputElement>(/new todo :/i),
      newTodo,
    );
    userEvent.click(await screen.findByTestId("new-todo-add-button"));

    await sleep(200);

    expect(spyOnCreate).toHaveBeenCalled();
    expect(await screen.findAllByTestId("todo-li")).toHaveLength(2);
    expect(await screen.findAllByTestId("todo-checkbox")).toHaveLength(2);
    expect(
      await screen.findByText<HTMLSpanElement>(newTodo),
    ).toBeInTheDocument();
    expect(await screen.findAllByTestId("modify-button")).toHaveLength(2);
    expect(await screen.findAllByTestId("delete-button")).toHaveLength(2);
  });

  test("todo 미완료 체크박스 클릭 시 완료가 반영된다.", async () => {
    const spyOnUpdate = jest.spyOn(remotes, "requestToUpdateTodo");
    spyOnUpdate.mockImplementation(
      async (): Promise<remotes.IResTodo> => ({
        id: 1,
        todo: "리액트 hook 배우기",
        isCompleted: true,
        userId: 12,
      }),
    );

    userEvent.click(await screen.findByTestId("todo-checkbox"));

    await sleep(200);

    expect(spyOnUpdate).toHaveBeenCalled();
    expect(await screen.findByTestId("todo-checkbox")).toBeChecked();
  });

  test("todo 수정 버튼을 누르면 수정모드로 바뀐다.", async () => {
    userEvent.click(await screen.findByTestId("modify-button"));

    expect(await screen.findByTestId("modify-input")).toBeInTheDocument();
    expect(await screen.findByTestId("submit-button")).toBeInTheDocument();
    expect(await screen.findByTestId("cancel-button")).toBeInTheDocument();
  });

  test("todo 수정 모드에서 완료 체크박스 클릭 시 수정모드는 그대로 유지한다.", async () => {
    const spyOnUpdate = jest.spyOn(remotes, "requestToUpdateTodo");
    spyOnUpdate.mockImplementation(
      async (): Promise<remotes.IResTodo> => ({
        id: 1,
        todo: "리액트 hook 배우기",
        isCompleted: true,
        userId: 12,
      }),
    );
    userEvent.click(await screen.findByTestId("modify-button"));
    userEvent.click(await screen.findByTestId("todo-checkbox"));

    await sleep(200);

    expect(await screen.findByTestId("todo-checkbox")).toBeInTheDocument();
    expect(await screen.findByTestId("todo-checkbox")).toBeChecked();
    expect(await screen.findByTestId("modify-input")).toBeInTheDocument();
    expect(await screen.findByTestId("submit-button")).toBeInTheDocument();
    expect(await screen.findByTestId("cancel-button")).toBeInTheDocument();
  });

  test("todo 수정 모드에서 내용을 변경 후 제출 버튼을 누르면 수정이 완료된다.", async () => {
    const newTodo = "리액트 context 배우기";
    const spyOnUpdate = jest.spyOn(remotes, "requestToUpdateTodo");
    spyOnUpdate.mockImplementation(
      async (): Promise<remotes.IResTodo> => ({
        id: 1,
        todo: newTodo,
        isCompleted: false,
        userId: 12,
      }),
    );

    userEvent.click(await screen.findByTestId("modify-button"));
    userEvent.type(await screen.findByTestId("modify-input"), newTodo);

    expect(
      await screen.findByDisplayValue<HTMLInputElement>(
        /리액트 context 배우기/,
      ),
    ).toBeInTheDocument();

    userEvent.click(await screen.findByTestId("submit-button"));

    await sleep(200);

    expect(spyOnUpdate).toHaveBeenCalled();
    expect(
      await screen.findByText<HTMLInputElement>(newTodo),
    ).toBeInTheDocument();
    expect(await screen.findByTestId("modify-button")).toBeInTheDocument();
    expect(await screen.findByTestId("delete-button")).toBeInTheDocument();
  });

  test("todo 취소 버튼을 누르면 수정모드가 비활성화되며 수정할 내용이 초기화된다.", async () => {
    userEvent.click(await screen.findByTestId("modify-button"));
    userEvent.click(await screen.findByTestId("cancel-button"));

    expect(
      await screen.findByText<HTMLSpanElement>(/리액트 hook 배우기/),
    ).toBeInTheDocument();
    expect(await screen.findByTestId("modify-button")).toBeInTheDocument();
    expect(await screen.findByTestId("delete-button")).toBeInTheDocument();
  });

  test("todo 삭제 버튼을 누르면 해당 todo가 삭제된다.", async () => {
    const spyOnDelete = jest.spyOn(remotes, "requestToDeleteTodo");
    spyOnDelete.mockImplementation(async (): Promise<void> => undefined);

    userEvent.click(await screen.findByTestId("delete-button"));

    await sleep(200);

    expect(spyOnDelete).toHaveBeenCalled();
    expect(screen.queryByTestId("todo-li")).not.toBeInTheDocument();
    expect(screen.queryByTestId("todo-checkbox")).not.toBeInTheDocument();
    expect(
      screen.queryByText<HTMLSpanElement>(/리액트 hook 배우기/),
    ).not.toBeInTheDocument();
    expect(screen.queryByTestId("modify-button")).not.toBeInTheDocument();
    expect(screen.queryByTestId("delete-button")).not.toBeInTheDocument();
  });
});
