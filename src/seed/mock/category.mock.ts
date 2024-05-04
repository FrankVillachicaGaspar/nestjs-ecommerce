import { faker } from '@faker-js/faker';
import { Category } from 'src/category/interfaces/category.interface';

const generateCategories = (quantity: number): Category[] => {
  const categoryList = new Array<Category>();
  for (let index = 0; index < quantity; index++) {
    const category = {
      id: index + 1,
      name: faker.commerce.productAdjective(),
      desc: faker.word.words({ count: { min: 4, max: 10 } }),
      createdAt: faker.date.anytime().toISOString(),
    };

    const existCategory = categoryList.find(
      (category) => category.name == category.name,
    );

    if (existCategory) {
      index--;
    } else {
      categoryList.push(category);
    }
  }
  return categoryList;
};

export const categoriesDataMock: Category[] = generateCategories(30);
