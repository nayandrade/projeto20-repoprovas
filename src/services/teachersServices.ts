import * as teacherReoisitory from "../repositories/teachersRepository";

export async function findTeacher(teacherId: number) {
  return teacherReoisitory.findTeacher(teacherId);
}
