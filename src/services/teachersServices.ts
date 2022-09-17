import * as teacherReoisitory from "../repositories/teachersRepository";

export async function findTeacher(teacherId: number) {
  return teacherReoisitory.findTeacher(teacherId);
}

export async function findAllTeachers() {
  return teacherReoisitory.findAllTeachers();
}
