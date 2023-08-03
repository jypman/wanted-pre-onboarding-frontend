export const mockConsoleError = () => {
  const consoleMock = jest.spyOn(console, "error");
  consoleMock.mockImplementation(() => undefined);

  return consoleMock;
};
