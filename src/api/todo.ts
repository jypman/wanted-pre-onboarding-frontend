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
  const request = await fetch(
    "https://www.pre-onboarding-selection-task.shop/todos",
    {
      method: "post",
      headers: {
        Authorization: `Bearer ${
          window.localStorage.getItem("accessToken") ?? ""
        }`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        todo,
      }),
    },
  );
  if (request.ok) {
    return request.json();
  } else {
    throw new Error();
  }
};

export const requestToGetTodo = async (): Promise<IResTodo[]> => {
  const request = await fetch(
    "https://www.pre-onboarding-selection-task.shop/todos",
    {
      method: "get",
      headers: {
        Authorization: `Bearer ${
          window.localStorage.getItem("accessToken") ?? ""
        }`,
      },
    },
  );
  if (request.ok) {
    return request.json();
  } else {
    throw new Error();
  }
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
  const request = await fetch(
    `https://www.pre-onboarding-selection-task.shop/todos/${id}`,
    {
      method: "put",
      headers: {
        Authorization: `Bearer ${
          window.localStorage.getItem("accessToken") ?? ""
        }`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        todo,
        isCompleted,
      }),
    },
  );
  if (request.ok) {
    return request.json();
  } else {
    throw new Error();
  }
};

export const requestToDeleteTodo = async (id: number): Promise<void> => {
  const request = await fetch(
    `https://www.pre-onboarding-selection-task.shop/todos/${id}`,
    {
      method: "delete",
      headers: {
        Authorization: `Bearer ${
          window.localStorage.getItem("accessToken") ?? ""
        }`,
      },
    },
  );
  if (!request.ok) {
    throw new Error();
  }
};
