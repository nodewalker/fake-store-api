export const hashPassword = async (pass: string): Promise<string> => {
  return pass;
};

export const verifyPassword = async (
  pass: string,
  hash: string,
): Promise<boolean> => {
  return pass === hash;
};
