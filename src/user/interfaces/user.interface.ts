export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  createdAt: string;
  modifiedAt?: string;
  deletedAt?: string;
  roleId: number;
}
