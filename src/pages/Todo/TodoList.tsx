import React, { useEffect } from "react";
import { IRenderTodo } from "../../types/todo";
import module from "../../styles/Todo.module.css";
import { TodoItem } from "./TodoItem";
import { useTodoAction, useTodoVal } from "../../providers/TodoProvider";
import { requestToGetTodo } from "../../api/todo";
import { handleError } from "../../api/http";

export const TodoList = () => {
  const todos = useTodoVal();
  const setTodos = useTodoAction();

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
        handleError(e);
      }
    };
    getTodo();
  }, []);

  return (
    <section>
      {todos.length > 0 && (
        <ul>
          {todos.map((todoItem: IRenderTodo) => {
            return (
              <li
                data-testid="todo-li"
                key={todoItem.id}
                className={module["cur-todo-list-module"]}
              >
                <TodoItem todo={todoItem} />
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
};
