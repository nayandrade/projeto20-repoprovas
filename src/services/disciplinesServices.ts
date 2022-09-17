import * as disciplinesRepository from "../repositories/disciplinesRepository";

export async function findDiscipline(disciplineId: number) {
  return disciplinesRepository.findDiscipline(disciplineId);
}

export async function findAllDisciplines() {
  return disciplinesRepository.getAllDisciplines();
}
