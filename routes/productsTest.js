import { faker } from '@faker-js/faker';

export function createRandomUser() {
  return {
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    url: faker.image.business()
  };
}

export default Array.from({ length: 10 }).map(() => {
    return createRandomUser();
});