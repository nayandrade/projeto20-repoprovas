import * as disciplineRepository from "../repositories/disciplineRepository";

export async function findDiscipline(disciplineId: number) {
  return disciplineRepository.findDiscipline(disciplineId);
}

export async function findAllDisciplines() {
  return disciplineRepository.getAllDisciplines();
}
