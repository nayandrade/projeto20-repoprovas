import { Request, Response } from "express";
import * as disciplinesServices from "../services/disciplinesServices";

export async function findDisciplinesByTerm(req: Request, res: Response) {
  const { term } = req.params;
  const disciplines = await disciplinesServices.findDisciplinesByTerm(
    parseInt(term)
  );
  res.status(200).send(disciplines);
}
