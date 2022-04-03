import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { User } from '../../models';
import { httpError } from './handleResponse';

const SECRET_JWT = process.env.SECRET_JWT || '';

export const validateJWT = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ').pop();

    if (!token) {
      throw { status: 401, msgCustom: 'The request does not have a token.' };
    }

    const payload = jwt.verify(token, SECRET_JWT, (err, decoded) => {
      if (err) {
        return { status: 401, msgCustom: 'Session expired' };
      }
      return decoded;
    }) as any;

    if (payload.msgCustom) {
      throw payload;
    }

    const user = await User.findById(payload.uid);

    if (!user) {
      throw { status: 401, msgCustom: 'Invalid token: User not found in the database.' };
    }

    req.userLogged = user;
    next();
  } catch (error) {
    httpError(res, error);
  }
};
