import { prisma } from "../database";

export async function findTeacher(id: number) {
  return prisma.teachers.findUnique({
    where: { id },
  });
}

export async function findAllTeachers() {
  return prisma.teachers.findMany()
}