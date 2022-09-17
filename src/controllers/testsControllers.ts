import { Request, Response } from "express";
import * as testsServices from "../services/testsServices";

export async function createtTest(req: Request, res: Response) {
  await testsServices.createtTest(req.body);
  res.sendStatus(201);
}
