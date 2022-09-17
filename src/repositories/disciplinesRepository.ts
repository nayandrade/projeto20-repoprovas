import { prisma } from "../database";

export async function findDiscipline(id: number) {
  return prisma.disciplines.findUnique({
    where: { id },
  });
}

// export async function getAllDisciplines() {
//   return await prisma.disciplines.findMany();
// }

export async function findDisciplinesByTerm(termId: number) {
  return await prisma.disciplines.findMany({
    where: { termId },
  });
}