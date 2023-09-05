import React, { useEffect } from "react";
import { IRenderTodo } from "../../types/todo";
import module from "../../styles/Todo.module.css";
import { TodoItem } from "./TodoItem";
import { useTodoAction, useTodoVal } from "../../providers/TodoProvider";

export const TodoList = () => {
  const todos = useTodoVal();
  const todoActions = useTodoAction();

  useEffect(() => {
    todoActions.getTodo();
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
