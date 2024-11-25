import type { Request, Response, NextFunction } from 'express';
import ResponsePayload from '@/utils/resGenerator';

export const errorMiddleware = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const resPayload = new ResponsePayload();
    console.error(err.stack);
    resPayload.setError(err.message || 'Internal Server Error');
    return res.status(500).json(resPayload);
};
