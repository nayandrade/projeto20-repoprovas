import { ItestBody } from "../types/testTypes";
import * as categoriesServices from "./categoriesServices";
import * as disciplinesServices from "./disciplinesServices";
import * as teachersServices from "./teachersServices";
import * as teachersDisciplinesServices from "./teachersDisciplinesServices";
import * as testsRepository from "../repositories/testsRepository";

export async function createtTest(newTestData: ItestBody) {
  const { name, pdfUrl, categoryId, teacherId, disciplineId } = newTestData;

  const hasCategory = await categoriesServices.findCategory(categoryId);
  if (!hasCategory) {
    throw {
      type: "bad_request",
      message: "Category does not exists",
    };
  }

  const hasDiscipline = await disciplinesServices.findDiscipline(disciplineId);
  if (!hasDiscipline) {
    throw {
      type: "bad_request",
      message: "Discipline does not exists",
    };
  }

  const hasTeacher = await teachersServices.findTeacher(teacherId);
  if (!hasTeacher) {
    throw {
      type: "bad_request",
      message: "Teacher does not exists",
    };
  }

  const teacherDiscipline =
    await teachersDisciplinesServices.findTeacherDisciplines(
      teacherId,
      disciplineId
    );

  if (!teacherDiscipline) {
    throw {
      type: "bad_request",
      message: "Teacher does not teach this discipline",
    };
  }

  const newTest = {
    name,
    pdfUrl,
    categoryId,
    teacherDisciplineId: teacherDiscipline.id,
  };

  await testsRepository.create(newTest);
}
