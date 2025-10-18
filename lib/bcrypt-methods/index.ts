import { compare, hash } from "bcryptjs";

export const hashPassword = (password: string, salt = 12) => {
  return hash(password, salt);
};

export const validatePassword = (plain: string, hashed: string) => {
  return compare(plain, hashed);
};
