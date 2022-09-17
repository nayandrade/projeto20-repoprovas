import { ItestBody } from "../types/testTypes";
import * as categoryServices from "../services/categoryServices";
import * as disciplineServices from "../services/disciplineServices";
import * as teacherServices from "../services/teacherServices";
import * as teacherDisciplinesServices from "../services/teacherDisciplinesServices";
import * as testRepository from "../repositories/testRepository";

export async function createtTest(newTestData: ItestBody) {
  const { name, pdfUrl, categoryId, teacherId, disciplineId } = newTestData;

  const hasCategory = await categoryServices.findCategory(categoryId);
  if (!hasCategory) {
    throw {
      type: "bad_request",
      message: "Category does not exists",
    };
  }

  const hasDiscipline = await disciplineServices.findDiscipline(disciplineId);
  if (!hasDiscipline) {
    throw {
      type: "bad_request",
      message: "Discipline does not exists",
    };
  }

  const hasTeacher = await teacherServices.findTeacher(teacherId);
  if (!hasTeacher) {
    throw {
      type: "bad_request",
      message: "Teacher does not exists",
    };
  }

  const teacherDiscipline =
    await teacherDisciplinesServices.findTeacherDisciplines(
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

  await testRepository.create(newTest);
}
