import http from "./http";
import { API } from "./constants";

interface IReqCreateTodo {
  todo: string;
}
export interface IResTodo {
  id: number;
  todo: string;
  isCompleted: boolean;
  userId: number;
}
export const requestToCreateTodo = async ({
  todo,
}: IReqCreateTodo): Promise<IResTodo> => {
  return http.post(API.TODOS, { todo });
};

export const requestToGetTodo = async (): Promise<IResTodo[]> => {
  return http.get(API.TODOS);
};

interface IReqUpdateTodo {
  todo: string;
  isCompleted: boolean;
  id: number;
}
export const requestToUpdateTodo = async ({
  todo,
  isCompleted,
  id,
}: IReqUpdateTodo): Promise<IResTodo> => {
  return http.put(`${API.TODOS}/${id}`, { todo, isCompleted });
};

export const requestToDeleteTodo = async (id: number): Promise<void> => {
  return http.delete(`${API.TODOS}/${id}`);
};
