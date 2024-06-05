import { compareSync, hashSync } from 'bcrypt';
import constants from './constants.utils';

export const encryptPassword = (password: string): string => {
  return hashSync(password, constants.ENCRYPT_SALT_ROUNDS);
};

export const comparePassword = (
  enteredPassword: string,
  hashedPassword: string,
): boolean => {
  return compareSync(enteredPassword, hashedPassword);
};
