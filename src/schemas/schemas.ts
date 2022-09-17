import joi from "joi";
import { Users } from "@prisma/client";
import { IuserBody } from "../types/userTypes";
import { ItestBody } from "../types/testTypes";

export const signupSchema = joi.object<IuserBody>({
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
  confirmation: joi.string().min(6).required(),
});

export const signinSchema = joi.object<Omit<Users, "id">>({
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
});

export const testSchema = joi.object<ItestBody>({
  name: joi.string().required(),
  pdfUrl: joi.string().uri().required(),
  categoryId: joi.number().greater(0).required(),
  teacherId: joi.number().greater(0).required(),
  disciplineId: joi.number().greater(0).required(),
});
