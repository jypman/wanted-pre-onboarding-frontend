import React, { useEffect, useState } from "react";
import { requestToGetTodo } from "../api/todo";
import { IRenderTodo } from "../types/todo";
import { AddTodoForm } from "./Todo/AddTodoForm";
import { TodoList } from "./Todo/TodoList";

const Todo = () => {
  const [todos, setTodos] = useState<IRenderTodo[]>([]);

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

  return (
    <main>
      <h1>todo list 페이지</h1>
      <AddTodoForm setTodos={setTodos} />
      <TodoList todos={todos} setTodos={setTodos} />
    </main>
  );
};

export default Todo;
