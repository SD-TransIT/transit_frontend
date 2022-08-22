export class NoErrorThrownError extends Error {}

export const getError = async (call: () => unknown): Promise<Error> => {
  try {
    await call();
    throw new NoErrorThrownError();
  } catch (error: unknown) {
    return error as Error;
  }
};
