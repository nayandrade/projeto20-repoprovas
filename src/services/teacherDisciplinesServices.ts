import * as teacherDisciplineRepository from "../repositories/teacherDisciplinesRepository";

export async function findTeacherDisciplines(
  teacherId: number,
  disciplineId: number
) {
  return teacherDisciplineRepository.findTeacherDisciplines(
    teacherId,
    disciplineId
  );
}
