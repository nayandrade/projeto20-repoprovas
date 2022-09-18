import { faker } from "@faker-js/faker";

export default async function testsFactory(
  categoryId: number,
  teacherId: number,
  disciplineId: number
) {
  return {
    name: `Test - ${faker.random.numeric(3)}`,
    pdfUrl: faker.internet.url(),
    categoryId,
    teacherId,
    disciplineId
  };
}
