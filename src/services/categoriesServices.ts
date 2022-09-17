import * as categoryRepository from "../repositories/categoriesRepository";

export async function findCategory(categoryId: number) {
  return categoryRepository.findCategory(categoryId);
}
