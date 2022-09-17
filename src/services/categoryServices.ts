import * as categoryRepository from "../repositories/categoryRepository";

export async function findCategory(categoryId: number) {
  return categoryRepository.findCategory(categoryId);
}
