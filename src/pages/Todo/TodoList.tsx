import React, { Dispatch } from "react";
import { IRenderTodo } from "../../types/todo";
import module from "../../styles/Todo.module.css";
import { TodoItem } from "./TodoItem";

interface TodoListProps {
  todos: IRenderTodo[];
  setTodos: Dispatch<React.SetStateAction<IRenderTodo[]>>;
}

export const TodoList = ({ todos, setTodos }: TodoListProps) => {
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
                <TodoItem todo={todoItem} setTodos={setTodos} />
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
};
