import { prisma } from "../database";
import { userInput } from "../types/userTypes";

export async function findUser(email: string) {
  const result = await prisma.users.findUnique({ where: { email } });
  return result;
}

export async function create(user: userInput) {
  return await prisma.users.create({ data: user });
}
