import { prisma } from "../database";
import { userInput } from "../types/userTypes";
import { Users } from "@prisma/client";

export async function findUser(email: string) : Promise<Users | null> {
  const result = await prisma.users.findUnique({ where: { email } });
  return result;
}

export async function create(user: userInput) {
  return await prisma.users.create({ data: user });
}