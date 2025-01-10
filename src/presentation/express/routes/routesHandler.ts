import { NextFunction, Request, Response } from 'express';
import IContoller from '../../http/controllers/Icontroller';
import {
  ReturnValue,
  ReturnValueWithPagination,
} from '../../../domain/valueObjects/returnValue';
import expressAdapter from '../../adapters/expressAdapter';
import { ResponseCodes } from '../../../domain/enums/responseCode';

export default function routesHandler(
  controller: IContoller<ReturnValue | ReturnValueWithPagination>
) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await expressAdapter(req, controller);

      if (!result.success || result.error) {
        throw result.error || new Error('Unexpected server error');
      }

      return res.status(ResponseCodes.Success).json(result);
    } catch (error) {
      next(error);
    }
  };
}
