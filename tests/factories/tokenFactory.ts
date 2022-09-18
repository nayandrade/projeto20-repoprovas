import { faker } from "@faker-js/faker";

export default async function tokenFactory() {
  const token = faker.datatype.uuid()
  return token
}