import bcrypt from 'bcrypt';

const hash = async (password: string, saltRounds = 10): Promise<string> => {
  const hash = await bcrypt.hash(password, saltRounds);
  return hash;
};

const compare = async (
  password: string,
  hashedPassword: string,
): Promise<boolean> => {
  const match = await bcrypt.compare(password, hashedPassword);
  return match;
};

export { hash, compare };
