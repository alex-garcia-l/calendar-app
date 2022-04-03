import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

export const httpError = (res: Response, error: any) => {
  if (error.msgCustom) {
    const { status, msgCustom } = error;

    res.status(status).json({
      msg: msgCustom,
    });
  } else {
    console.log(error);

    res.status(500).json({
      msg: 'Algo salió mal.',
    });
  }
};

export const validateResult = (req: Request, res: Response, next: NextFunction) => {
  try {
    validationResult(req).throw();
    return next();
  } catch (error: any) {
    res.status(400).send({ errors: error.array() });
  }
};
