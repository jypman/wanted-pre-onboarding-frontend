import React from "react";
import { IRenderTodo } from "../../types/todo";
import { requestToDeleteTodo, requestToUpdateTodo } from "../../api/todo";
import { handleError } from "../../api/http";
import { useTodoAction } from "../../providers/TodoProvider";

interface TodoItemProps {
  todo: IRenderTodo;
}

export const TodoItem = ({ todo }: TodoItemProps) => {
  const setTodos = useTodoAction();
  const typeTempTodoVal = (
    e: React.ChangeEvent<HTMLInputElement>,
    todoId: number,
  ): void => {
    setTodos((prevState: IRenderTodo[]) =>
      prevState.map((curTodo: IRenderTodo) =>
        todoId === curTodo.id
          ? { ...curTodo, tempTodoVal: e.target.value }
          : curTodo,
      ),
    );
  };

  const toggleModifiedMode = (todoId: number, isModifyMode: boolean): void => {
    setTodos((prevState: IRenderTodo[]) =>
      prevState.map((curTodo: IRenderTodo) =>
        todoId === curTodo.id
          ? {
              ...curTodo,
              isModifyMode,
              tempTodoVal: isModifyMode ? curTodo.tempTodoVal : undefined,
            }
          : curTodo,
      ),
    );
  };

  const updateTodo = async (
    todoItem: IRenderTodo,
    isClickedCheckBox: boolean,
  ): Promise<void> => {
    try {
      const updateData = await requestToUpdateTodo({
        todo: todoItem.todo,
        isCompleted: todoItem.isCompleted,
        id: todoItem.id,
      });
      setTodos((prevState: IRenderTodo[]) =>
        prevState.map((curTodo: IRenderTodo) =>
          todoItem.id === curTodo.id
            ? {
                ...curTodo,
                todo: updateData.todo,
                isCompleted: updateData.isCompleted,
                isModifyMode: isClickedCheckBox ? curTodo.isModifyMode : false,
                tempTodoVal: isClickedCheckBox
                  ? curTodo.tempTodoVal
                  : undefined,
              }
            : curTodo,
        ),
      );
    } catch (e) {
      handleError(e);
    }
  };

  const deleteTodo = async (todoItemId: number): Promise<void> => {
    try {
      await requestToDeleteTodo(todoItemId);
      setTodos((prevState: IRenderTodo[]) =>
        prevState.filter((curTodo: IRenderTodo) => curTodo.id !== todoItemId),
      );
    } catch (e) {
      handleError(e);
    }
  };

  return (
    <section>
      <input
        id={todo.id.toString()}
        data-testid="todo-checkbox"
        type="checkbox"
        checked={todo.isCompleted}
        onChange={() =>
          updateTodo({ ...todo, isCompleted: !todo.isCompleted }, true)
        }
      />
      <label htmlFor={todo.id.toString()} />
      {todo.isModifyMode ? (
        <>
          <input
            id={todo.id.toString()}
            defaultValue={todo.todo}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              typeTempTodoVal(e, todo.id)
            }
            data-testid="modify-input"
          />
          <label htmlFor={todo.id.toString()} />
          <button
            data-testid="submit-button"
            onClick={() =>
              updateTodo(
                { ...todo, todo: todo.tempTodoVal ?? todo.todo },
                false,
              )
            }
          >
            제출
          </button>
          <button
            data-testid="cancel-button"
            onClick={() => toggleModifiedMode(todo.id, false)}
          >
            취소
          </button>
        </>
      ) : (
        <>
          <span>{todo.todo}</span>
          <button
            data-testid="modify-button"
            onClick={() => toggleModifiedMode(todo.id, true)}
          >
            수정
          </button>
          <button
            data-testid="delete-button"
            onClick={() => deleteTodo(todo.id)}
          >
            삭제
          </button>
        </>
      )}
    </section>
  );
};
