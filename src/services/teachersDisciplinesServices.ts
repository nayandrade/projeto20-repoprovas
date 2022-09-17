import * as teacherDisciplineRepository from "../repositories/teachersDisciplinesRepository";

export async function findTeacherDisciplines(
  teacherId: number,
  disciplineId: number
) {
  return teacherDisciplineRepository.findTeacherDisciplines(
    teacherId,
    disciplineId
  );
}
