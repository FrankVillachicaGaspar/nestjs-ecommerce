export interface Product {
  id: number;
  name: string;
  desc: string;
  stock: number;
  categoryId: number;
  price: number;
  createdAt: string;
  modifiedAt?: string;
  deletedAt?: string;
}
