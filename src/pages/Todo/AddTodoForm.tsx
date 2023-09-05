import React, { useState } from "react";
import module from "../../styles/Todo.module.css";
import { useTodoAction } from "../../providers/TodoProvider";

export const AddTodoForm = () => {
  const [newTodoVal, setNewTodoVal] = useState<string>("");
  const todoActions = useTodoAction();

  const typeNewTodoVal = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setNewTodoVal(e.target.value);
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
        <button
          data-testid="new-todo-add-button"
          onClick={() =>
            todoActions.addTodo(newTodoVal, () => setNewTodoVal(""))
          }
        >
          추가
        </button>
      </div>
    </section>
  );
};
