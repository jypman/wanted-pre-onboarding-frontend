import React, { useState } from "react";
import module from "../../styles/Todo.module.css";
import { requestToCreateTodo } from "../../api/todo";
import { IRenderTodo } from "../../types/todo";
import { handleError } from "../../api/http";
import { useTodoAction } from "../../providers/TodoProvider";

export const AddTodoForm = () => {
  const [newTodoVal, setNewTodoVal] = useState<string>("");
  const setTodos = useTodoAction();

  const typeNewTodoVal = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setNewTodoVal(e.target.value);
  };

  const addTodo = async (): Promise<void> => {
    try {
      if (newTodoVal.length > 0) {
        const data = await requestToCreateTodo({
          todo: newTodoVal,
        });
        setNewTodoVal("");
        setTodos((prevState: IRenderTodo[]) => [
          ...prevState,
          { ...data, isModifyMode: false },
        ]);
      }
    } catch (e) {
      handleError(e);
    }
  };

  return (
    <section>
      <div className={module["new-input-module"]}>
        <label htmlFor="new-todo-input">new todo :</label>
        <input
          id="new-todo-input"
          data-testid="new-todo-input"
          value={newTodoVal}
          onChange={typeNewTodoVal}
        />
        <button data-testid="new-todo-add-button" onClick={addTodo}>
          추가
        </button>
      </div>
    </section>
  );
};
