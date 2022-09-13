import { Request, Response } from "express";
import * as authServices from "../services/authServices"


export async function signup(req: Request, res: Response) {
    const user = req.body
    await authServices.createtUser(user)
    res.sendStatus(201)
}

export async function signin(req: Request, res: Response)  {
    const user = req.body
    console.log(user)
    const token = await authServices.connectUser(user)
    res.status(200).send(token)
}