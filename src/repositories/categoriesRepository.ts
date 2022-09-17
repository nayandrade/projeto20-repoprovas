import { prisma } from "../database";

export async function findCategory(id: number) {
  return prisma.categories.findUnique({
    where: { id },
  });
}
