import { Request, Response } from "express";
import * as testServices from "../services/testServices";

export async function createtTest(req: Request, res: Response) {
  await testServices.createtTest(req.body);
  res.sendStatus(201);
}
