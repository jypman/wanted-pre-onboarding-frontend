import React, { createContext, useState, useContext, useMemo } from "react";
import { IRenderTodo } from "../types/todo";
import {
  requestToCreateTodo,
  requestToDeleteTodo,
  requestToGetTodo,
  requestToUpdateTodo,
} from "../api/todo";
import { handleError } from "../api/http";

interface TodoProviderProps {
  children: React.ReactElement;
}

type TodoActionType =
  | "getTodo"
  | "addTodo"
  | "typeTempTodoVal"
  | "toggleModifiedMode"
  | "updateTodo"
  | "deleteTodo";

const TodoValCtx = createContext<IRenderTodo[]>([]);
const TodoActionCtx = createContext<Record<TodoActionType, Function>>({
  getTodo: () => {},
  addTodo: () => {},
  typeTempTodoVal: () => {},
  toggleModifiedMode: () => {},
  updateTodo: () => {},
  deleteTodo: () => {},
});

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

  const addTodo = async (
    newTodoVal: string,
    onSubmit: Function,
  ): Promise<void> => {
    try {
      if (newTodoVal.length > 0) {
        const data = await requestToCreateTodo({
          todo: newTodoVal,
        });
        onSubmit();
        setTodos((prevState: IRenderTodo[]) => [
          ...prevState,
          { ...data, isModifyMode: false },
        ]);
      }
    } catch (e) {
      handleError(e);
    }
  };

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

  const todoActions = useMemo(
    () => ({
      getTodo,
      addTodo,
      typeTempTodoVal,
      toggleModifiedMode,
      updateTodo,
      deleteTodo,
    }),
    [],
  );

  return (
    <TodoActionCtx.Provider value={todoActions}>
      <TodoValCtx.Provider value={todos}>{children}</TodoValCtx.Provider>
    </TodoActionCtx.Provider>
  );
};
