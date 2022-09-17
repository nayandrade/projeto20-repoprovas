import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export default async function jwtMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  if (!token) {
    throw {
      type: "not_found",
      message: "No token provided, please login to continue",
    };
  }

  try {
    const SECRET = String(process.env.JWT_KEY);
    const decoded = jwt.verify(token, SECRET);
    if (!decoded) {
      throw {
        type: "not_found",
        message: "No token provided, please login to continue",
      };
    }

    const { id } = decoded as { id: number };
    res.locals.id = id;
  } catch (error) {
    res
      .status(401)
      .json({ auth: false, message: "Failed to authenticate token." });
    return;
  }
  next();
}
