import jwt from 'jsonwebtoken';
import User from '../models/User';

const SECRET_JWT = process.env.SECRET_JWT || '';

export const generateToken = (uid: string = '') => {
  return new Promise((resolve, reject) => {
    const payload = { uid };

    jwt.sign(payload, SECRET_JWT, { expiresIn: '4h' }, (error, token) => {
      if (error) {
        reject('Token not generated');
      } else {
        resolve(token);
      }
    });
  });
};

export const helperValidateJWT = async (authorization: string) => {
  const token = authorization && (authorization.split(' ').pop() as string);

  try {
    const { uid } = jwt.verify(token, SECRET_JWT) as any;
    const user = await User.findById(uid);

    if (!user && !user.status) {
      return null;
    }

    return user;
  } catch (error) {
    return null;
  }
};

export const isEquals = (val1: any, val2: any) => {
  if (val1 !== val2) {
    throw new Error('Not equals.');
  }

  return true;
};
