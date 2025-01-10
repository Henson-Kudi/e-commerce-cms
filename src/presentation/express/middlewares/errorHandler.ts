// Change this file to handle errors as you would like
import { ErrorRequestHandler } from 'express';
import logger from '../../../utils/logger';
import AppError from '../../../domain/valueObjects/error';
import { ResponseCodes } from '../../../domain/enums/responseCode';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorRequestHandler: ErrorRequestHandler = (err, req, res, next) => {
  logger.error((err as Error).message, err);

  const error =
    err instanceof AppError
      ? err
      : new AppError((err as Error).message, ResponseCodes.ServerError);

  return res.status(500).json(error);
};

export default errorRequestHandler;
