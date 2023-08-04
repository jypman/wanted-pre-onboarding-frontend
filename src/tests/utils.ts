export const mockConsoleError = () => {
  const consoleMock = jest.spyOn(console, "error");
  consoleMock.mockImplementation(() => undefined);

  return consoleMock;
};

export const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};
