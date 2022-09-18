import { Request, Response } from "express";
import * as testsServices from "../services/testsServices";

export async function createtTest(req: Request, res: Response) {
  await testsServices.createtTest(req.body);
  res.sendStatus(201);
}

export async function getTestsByTerms(req: Request, res: Response) {
  const tests = await testsServices.getTestsByTerms();
  res.status(200).send(tests)
}

export async function getTestsByTeacher(req: Request, res: Response) {
  const tests = await testsServices.getTestsByTeacher();
  res.status(200).send(tests)
}