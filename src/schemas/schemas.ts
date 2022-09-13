import joi from "joi";
import { Users } from "@prisma/client";
import { IuserBody } from "../types/userTypes";

export const signupSchema = joi.object<IuserBody>({
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
  confirmation: joi.string().min(6).required(),
});

export const signinSchema = joi.object<(Omit<Users, "id">)>({
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
  });