import React, { useEffect, useRef, useState } from "react";
import {
  IResTodo,
  requestToCreateTodo,
  requestToDeleteTodo,
  requestToGetTodo,
  requestToUpdateTodo,
} from "../api/todo";
import module from "../styles/Todo.module.css";

interface IRenderTodo extends IResTodo {
  /** 수정모드 on/off */
  isModifyMode: boolean;
  /** 특정 todo의 내용을 임시저장한다.
   * 특정 todo의 내용을 수정하다가 취소를 클릭한 경우 서버 응답했던 todo 값으로 되돌려준다.
   * 만약 todo의 내용을 수정하고 제출을 누르면 tempTodoVal의 값을 서버에 요청한다.
   * */
  tempTodoVal?: string;
}

const Todo = () => {
  const [todos, setTodos] = useState<IRenderTodo[]>([]);
  const newTodoVal = useRef<string>("");

  useEffect(() => {
    const getTodo = async () => {
      try {
        const data = await requestToGetTodo();
        setTodos(
          data.map((item) => ({
            ...item,
            isModifyMode: false,
          })),
        );
      } catch (e) {
        console.error(e);
      }
    };
    getTodo();
  }, []);

  const typeNewTodoVal = (e: React.ChangeEvent<HTMLInputElement>): void => {
    newTodoVal.current = e.target.value;
  };

  const addTodo = async (): Promise<void> => {
    try {
      if (newTodoVal.current.length > 0) {
        const data = await requestToCreateTodo({
          todo: newTodoVal.current,
        });
        setTodos((prevState: IRenderTodo[]) => [
          ...prevState,
          { ...data, isModifyMode: false },
        ]);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const typeTempTodo = (
    e: React.ChangeEvent<HTMLInputElement>,
    curTodoIndex: number,
  ): void => {
    setTodos((prevState: IRenderTodo[]) =>
      prevState.map((curTodo: IRenderTodo, newTodoIndex) =>
        curTodoIndex === newTodoIndex
          ? { ...curTodo, tempTodoVal: e.target.value }
          : curTodo,
      ),
    );
  };

  // 체크박스를 통해 todo를 업데이할 경우 isCompleted의 자료형은 boolean
  // 제출 버튼을 통해 todo를 업데이트할 경우 해당 함수 호출 시 isCompleted에 값을 할당하지 않기에 자료형은 undefined
  const updateTodoVal = async (
    todoItem: IRenderTodo,
    curTodoIndex: number,
    isCompleted?: boolean,
  ): Promise<void> => {
    try {
      const updateData = await requestToUpdateTodo({
        todo:
          // 체크박스를 클릭하여 todo를 업데이트할 경우 기존 todo 값 사용
          // 그렇지 않으면 새로 작성한 todo의 값
          // 새로 작성한 todo 없이 바로 제출을 누르면 기존 todo 값 사용
          typeof isCompleted === "boolean"
            ? todoItem.todo
            : todoItem.tempTodoVal ?? todoItem.todo,
        isCompleted: isCompleted ?? todoItem.isCompleted,
        id: todoItem.id,
      });
      setTodos((prevState: IRenderTodo[]) =>
        prevState.map((curTodo: IRenderTodo, newTodoIndex) =>
          curTodoIndex === newTodoIndex
            ? {
                ...curTodo,
                todo: updateData.todo,
                isCompleted: updateData.isCompleted,

                // 체크박스를 클릭한 경우 수정모드는 그대로 유지
                // 제출버튼을 누른 경우 수정모드 비활성화
                isModifyMode: typeof isCompleted === "boolean",

                // 체크박스를 클릭한 경우 새로 작성 중인 todo 값은 유지
                // 제출버튼을 누른 경우 새로 작성했던 todo 내용은 초기화
                tempTodoVal:
                  typeof isCompleted === "boolean"
                    ? curTodo.tempTodoVal
                    : undefined,
              }
            : curTodo,
        ),
      );
    } catch (e) {
      console.error(e);
    }
  };

  const cancelModifiedMode = (curTodoIndex: number): void => {
    setTodos((prevState: IRenderTodo[]) =>
      prevState.map((curTodo: IRenderTodo, newTodoIndex) =>
        curTodoIndex === newTodoIndex
          ? { ...curTodo, isModifyMode: false, tempTodoVal: undefined }
          : curTodo,
      ),
    );
  };

  const turnModifiedMode = (curTodoIndex: number): void => {
    setTodos((prevState: IRenderTodo[]) =>
      prevState.map((curTodo: IRenderTodo, newTodoIndex) =>
        curTodoIndex === newTodoIndex
          ? { ...curTodo, isModifyMode: true }
          : curTodo,
      ),
    );
  };

  const deleteTodo = async (todoItemId: number): Promise<void> => {
    try {
      await requestToDeleteTodo(todoItemId);
      setTodos((prevState: IRenderTodo[]) =>
        prevState.filter((curTodo: IRenderTodo) => curTodo.id !== todoItemId),
      );
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <h1>todo list 페이지</h1>
      <div className={module["new-input-module"]}>
        <label htmlFor="new-todo-input">new todo :</label>
        <input
          id="new-todo-input"
          data-testid="new-todo-input"
          onChange={typeNewTodoVal}
        />
        <button data-testid="new-todo-add-button" onClick={addTodo}>
          추가
        </button>
      </div>
      {todos.length > 0 && (
        <ul>
          {todos.map((todoItem: IRenderTodo, curTodoIndex: number) => {
            return (
              <li
                data-testid="todo-li"
                key={todoItem.id}
                className={module["cur-todo-list-module"]}
              >
                <input
                  id={todoItem.id.toString()}
                  data-testid="todo-checkbox"
                  type="checkbox"
                  checked={todoItem.isCompleted}
                  onChange={() =>
                    updateTodoVal(todoItem, curTodoIndex, !todoItem.isCompleted)
                  }
                />
                <label htmlFor={todoItem.id.toString()} />
                {todoItem.isModifyMode ? (
                  <>
                    <input
                      id={todoItem.id.toString()}
                      defaultValue={todoItem.todo}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        typeTempTodo(e, curTodoIndex)
                      }
                      data-testid="modify-input"
                    />
                    <label htmlFor={todoItem.id.toString()} />
                    <button
                      data-testid="submit-button"
                      onClick={() => updateTodoVal(todoItem, curTodoIndex)}
                    >
                      제출
                    </button>
                    <button
                      data-testid="cancel-button"
                      onClick={() => cancelModifiedMode(curTodoIndex)}
                    >
                      취소
                    </button>
                  </>
                ) : (
                  <>
                    <span>{todoItem.todo}</span>
                    <button
                      data-testid="modify-button"
                      onClick={() => turnModifiedMode(curTodoIndex)}
                    >
                      수정
                    </button>
                    <button
                      data-testid="delete-button"
                      onClick={() => deleteTodo(todoItem.id)}
                    >
                      삭제
                    </button>
                  </>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};

export default Todo;
