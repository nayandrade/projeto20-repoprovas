import { prisma } from "../database";

export async function findDiscipline(id: number) {
  return prisma.disciplines.findUnique({
    where: { id },
  });
}