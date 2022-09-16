import { Request, Response } from "express";
import * as authServices from "../services/authServices";

export async function signup(req: Request, res: Response) {
  const user = req.body;
  const newUser = await authServices.createtUser(user);
  res.status(201).send(newUser);
}

export async function signin(req: Request, res: Response) {
  const user = req.body;
  //console.log(user);
  const token = await authServices.connectUser(user);
  res.status(200).send(token);
}
