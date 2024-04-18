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

const generateUsers = (quantity: number): User[] => {
  const userList = new Array<User>();

  for (let index = 0; index < quantity; index++) {
    userList.push({
      id: index + 1,
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      phoneNumber: faker.phone.number(),
      roleId: 2,
      createdAt: faker.date.anytime().toISOString(),
    });
  }
  userList.unshift({ id: userList.length, ...adminUser });
  return userList;
};

export const usersDataMock: User[] = generateUsers(30);
