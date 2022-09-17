import { prisma } from "../database";

export async function findTeacherDisciplines(
  teacherId: number,
  disciplineId: number
) {
  return prisma.teachersDisciplines.findFirst({
    where: { AND: { disciplineId, teacherId } },
  });
}
