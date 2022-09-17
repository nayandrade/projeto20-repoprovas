import { Request, Response } from "express";
import * as disciplineServices from "../services/disciplineServices";

export async function findAllDisciplines(req: Request, res: Response) {
  const disciplines = await disciplineServices.findAllDisciplines();
  res.status(200).send(disciplines);
}
