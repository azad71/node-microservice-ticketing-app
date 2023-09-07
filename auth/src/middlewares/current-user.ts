import { RequestHandler } from "express";
import jwt from "jsonwebtoken";

interface UserPayload {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const currentUser: RequestHandler = (req, res, next) => {
  console.log(req.session);
  if (!req.session?.token) {
    return next();
  }

  try {
    const payload = jwt.verify(
      req.session.token,
      process.env.JWT_KEY!
    ) as UserPayload;

    req.currentUser = payload;
  } catch (error) {}

  next();
};
