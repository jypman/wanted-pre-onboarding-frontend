interface IReqSignup {
  email: string;
  password: string;
}
export const requestSignup = async ({
  email,
  password,
}: IReqSignup): Promise<void> => {
  const request = await fetch(
    "https://www.pre-onboarding-selection-task.shop/auth/signup",
    {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    },
  );
  if (!request.ok) {
    throw new Error();
  }
};

interface IReqSignin {
  email: string;
  password: string;
}
interface IResSignin {
  access_token: string;
}
export const requestSignin = async ({
  email,
  password,
}: IReqSignin): Promise<IResSignin> => {
  const request = await fetch(
    "https://www.pre-onboarding-selection-task.shop/auth/signin",
    {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    },
  );
  if (request.ok) {
    return request.json();
  } else {
    throw new Error();
  }
};
