import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
  useContext,
} from "react";
import { IRenderTodo } from "../types/todo";

interface TodoProviderProps {
  children: React.ReactElement;
}

const TodoValCtx = createContext<IRenderTodo[]>([]);
const TodoActionCtx = createContext<Dispatch<SetStateAction<IRenderTodo[]>>>(
  () => {},
);

export const useTodoVal = () => {
  const val = useContext(TodoValCtx);
  if (val === undefined) {
    throw new Error("useTodoVal should be used within TodoProvider");
  }
  return val;
};

export const useTodoAction = () => {
  const val = useContext(TodoActionCtx);
  if (val === undefined) {
    throw new Error("useTodoAction should be used within TodoProvider");
  }
  return val;
};

export const TodoProvider = ({ children }: TodoProviderProps) => {
  const [todos, setTodos] = useState<IRenderTodo[]>([]);

  return (
    <TodoActionCtx.Provider value={setTodos}>
      <TodoValCtx.Provider value={todos}>{children}</TodoValCtx.Provider>
    </TodoActionCtx.Provider>
  );
};
