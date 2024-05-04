import { faker } from '@faker-js/faker';
import { Product } from 'src/product/interfaces/product.interface';

/**
 * Generate mock products using faker-js
 * - Recommended max quantity: 30
 * @param quantity number
 * @returns Product[]
 */
export const generateProducts = (quantity: number): Product[] => {
  const productList = new Array<Product>();
  for (let index = 0; index < quantity; index++) {
    productList.push({
      id: index + 1,
      name: faker.commerce.product(),
      desc: faker.word.words({ count: { min: 4, max: 10 } }),
      price: faker.number.float({ min: 10, max: 200, fractionDigits: 2 }),
      stock: faker.number.int({ min: 5, max: 50 }),
      categoryId: faker.number.int({ min: 1, max: 24 }), //Don't modify the min and max
      createdAt: faker.date.anytime().toISOString(),
      modifiedAt: faker.date.anytime().toISOString(),
    });
  }
  return productList;
};
