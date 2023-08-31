import { RequestHandler } from "express";
import { NotAuthorisedError } from "../errors/not-authorised-error";

export const requireAuth: RequestHandler = (req, res, next) => {
  if (!req.currentUser) {
    throw new NotAuthorisedError();
  }

  next();
};
