import { User } from 'src/user/interfaces/user.interface';
import { faker } from '@faker-js/faker';

const adminUser: User = {
  id: 1,
  username: 'admin',
  email: 'admin@cmg.com',
  password: 'admin123',
  firstName: 'admin',
  lastName: 'admin',
  phoneNumber: '+51 956532235',
  roleId: 1,
  createdAt: new Date().toISOString(),
};

/**
 * Generate mock users using faker-js
 * - Recommended max quantity: 30
 * @param quantity number
 * @returns User[]
 */
export const generateUsers = (quantity: number): User[] => {
  const userList = new Array<User>();

  for (let index = 0; index < quantity; index++) {
    const user = {
      id: index + 1,
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      phoneNumber: generatePhoneNumber(),
      roleId: 2,
      createdAt: faker.date.anytime().toISOString(),
    };

    const existUserByPhoneNumber = userList.find(
      (u) => u.phoneNumber == user.phoneNumber,
    );

    if (existUserByPhoneNumber) {
      index--;
    } else userList.push(user);
  }
  userList.unshift({ id: userList.length, ...adminUser });
  return userList;
};

function generatePhoneNumber() {
  const countryCode = '+51';
  const mobilePrefix = '9';
  let phoneNumber = countryCode + ' ' + mobilePrefix;

  for (let i = 0; i < 8; i++) {
    phoneNumber += Math.floor(Math.random() * 10);
  }

  return phoneNumber;
}
