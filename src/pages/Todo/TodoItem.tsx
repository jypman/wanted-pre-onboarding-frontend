import React from "react";
import { IRenderTodo } from "../../types/todo";
import { useTodoAction } from "../../providers/TodoProvider";

interface TodoItemProps {
  todo: IRenderTodo;
}

export const TodoItem = ({ todo }: TodoItemProps) => {
  const todoActions = useTodoAction();

  return (
    <section>
      <input
        id={todo.id.toString()}
        data-testid="todo-checkbox"
        type="checkbox"
        checked={todo.isCompleted}
        onChange={() =>
          todoActions.updateTodo(
            { ...todo, isCompleted: !todo.isCompleted },
            true,
          )
        }
      />
      <label htmlFor={todo.id.toString()} />
      {todo.isModifyMode ? (
        <>
          <input
            id={todo.id.toString()}
            defaultValue={todo.todo}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              todoActions.typeTempTodoVal(e, todo.id)
            }
            data-testid="modify-input"
          />
          <label htmlFor={todo.id.toString()} />
          <button
            data-testid="submit-button"
            onClick={() =>
              todoActions.updateTodo(
                { ...todo, todo: todo.tempTodoVal ?? todo.todo },
                false,
              )
            }
          >
            제출
          </button>
          <button
            data-testid="cancel-button"
            onClick={() => todoActions.toggleModifiedMode(todo.id, false)}
          >
            취소
          </button>
        </>
      ) : (
        <>
          <span>{todo.todo}</span>
          <button
            data-testid="modify-button"
            onClick={() => todoActions.toggleModifiedMode(todo.id, true)}
          >
            수정
          </button>
          <button
            data-testid="delete-button"
            onClick={() => todoActions.deleteTodo(todo.id)}
          >
            삭제
          </button>
        </>
      )}
    </section>
  );
};
