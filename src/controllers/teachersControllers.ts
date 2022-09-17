import { Request, Response } from "express";
import * as teachersServices from "../services/teachersServices";

export async function findAllTeachers(req: Request, res: Response) {
    const teachers = await teachersServices.findAllTeachers();
    res.status(200).send(teachers);
  }