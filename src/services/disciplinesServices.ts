import * as disciplinesRepository from "../repositories/disciplinesRepository";

export async function findDiscipline(disciplineId: number) {
  return disciplinesRepository.findDiscipline(disciplineId);
}


export async function findDisciplinesByTerm(termId: number) {
  return disciplinesRepository.findDisciplinesByTerm(termId)
}
