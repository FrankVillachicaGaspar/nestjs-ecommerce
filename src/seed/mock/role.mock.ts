interface Role {
  id: number;
  name: string;
  createdAt: string;
}
export const rolesDataMock: Role[] = [
  {
    id: 1,
    name: 'ADMIN',
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    name: 'CUSTOMER',
    createdAt: new Date().toISOString(),
  },
];