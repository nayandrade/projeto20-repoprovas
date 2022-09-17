import { Request, Response } from "express";
import * as disciplinesServices from "../services/disciplinesServices";

export async function findAllDisciplines(req: Request, res: Response) {
  const disciplines = await disciplinesServices.findAllDisciplines();
  res.status(200).send(disciplines);
}
