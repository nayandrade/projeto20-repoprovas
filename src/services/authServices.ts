import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import * as authRepository from "../repositories/authRepository";
import { IuserBody, userInput } from "../types/userTypes";
import bcrypt from "bcrypt";

dotenv.config();

export async function createtUser(user: IuserBody) {
  const { email, password, confirmation } = user;

  if (password !== confirmation) {
    throw {
      type: "unprocessable_entity",
      message: "Password does not match",
    };
  }

  const hasUser = await findUser(email);
  if (hasUser) {
    throw {
      type: "conflict",
      message: "User already registered, please login to continue",
    };
  }
  const encriptedPassword = bcrypt.hashSync(password, 10);
  const newUser = await authRepository.create({
    email: user.email,
    password: encriptedPassword,
  });
  return newUser;
}

export async function connectUser(user: userInput) {
  const { email, password } = user;
  const hasUser = await findUser(email);
  const id = hasUser?.id;

  if (!hasUser) {
    throw {
      type: "not_found",
      message: "User not found, please create an account to continue",
    };
  }

  const validatePassword = await bcrypt.compare(password, hasUser.password);
  if (!validatePassword) {
    throw {
      type: "unauthorized",
      message: "Unauthorized, please login to continue",
    };
  }

  const token = jwt.sign({ id }, String(process.env.JWT_KEY), {
    expiresIn: process.env.TOKEN_DURATION,
  });
  return token;
}

async function findUser(email: string) {
  const user = await authRepository.findUser(email);
  return user;
}
