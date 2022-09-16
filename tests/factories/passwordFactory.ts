import { faker } from "@faker-js/faker";

export default async function passwordFactory() {
  return faker.internet.password();
  
}