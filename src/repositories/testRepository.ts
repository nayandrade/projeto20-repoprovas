import { prisma } from "../database";
import { testInput } from "../types/testTypes";

export async function create(newTestData: testInput) {
  await prisma.tests.create({
    data: newTestData,
  });
}
