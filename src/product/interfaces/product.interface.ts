import { Category } from "src/category/interfaces/category.interface";

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
  category?: Category;
}
