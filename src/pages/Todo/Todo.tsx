import React from "react";
import { AddTodoForm } from "./AddTodoForm";
import { TodoList } from "./TodoList";

const Todo = () => {
  return (
    <main>
      <h1>todo list 페이지</h1>
      <AddTodoForm />
      <TodoList />
    </main>
  );
};

export default Todo;
