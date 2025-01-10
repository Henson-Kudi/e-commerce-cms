import { NextFunction, Request, Response } from 'express';
import AppError from '../../../domain/valueObjects/error';
import { ResponseCodes } from '../../../domain/enums/responseCode';

export default function authenticateRequest(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.headers?.['user-id'] || !req.headers?.['userid']) {
    next(new AppError('Not authenticated', ResponseCodes.Forbidden));
  } else {
    req.headers.userId = req.headers['user-id'];
    next();
  }
}
