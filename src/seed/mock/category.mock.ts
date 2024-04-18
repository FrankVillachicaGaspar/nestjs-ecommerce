import { faker } from '@faker-js/faker';
import { Category } from 'src/category/interfaces/category.interface';

const generateCategories = (quantity: number): Category[] => {
  const categoryList = new Array<Category>();
  for (let index = 0; index < quantity; index++) {
    categoryList.push({
      id: index + 1,
      name: faker.commerce.productAdjective(),
      desc: faker.word.words({ count: { min: 4, max: 10 } }),
      createdAt: faker.date.anytime().toISOString(),
    });
  }
  return categoryList;
};

export const categoriesDataMock: Category[] = generateCategories(30);
