import * as teacherReoisitory from "../repositories/teacherRepository";

export async function findTeacher(teacherId: number) {
  return teacherReoisitory.findTeacher(teacherId);
}
