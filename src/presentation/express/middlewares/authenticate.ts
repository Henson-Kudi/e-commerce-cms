import { NextFunction, Request, Response } from "express";
import envConf from "../../../env.conf";
import AppError from "../../../domain/valueObjects/error";
import { ResponseCodes } from "../../../domain/enums/responseCode";

export default function authenticateRequest(req: Request, res: Response, next: NextFunction) {
    // remove next line for production
    if (envConf.NODE_ENV !== 'production') {
        req.headers.userId = '9441463b-4b6e-4d9d-83bd-92f3fd8318f9'
        next();
        return;
    }

    if (!req.headers['user-id']) {
        next(new AppError('Not authenticated', ResponseCodes.Forbidden))
    } else {
        req.headers.userId = req.headers['user-id']
        next();
    }

}