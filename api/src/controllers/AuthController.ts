import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';

import User from '../models/User';
import { httpError } from '../middlewares/generals/handleResponse';
import { generateToken } from '../helpers/jwtValidateHelper';

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      throw { status: 400, msgCustom: 'Password or email is incorrect.' };
    }

    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      throw { status: 400, msgCustom: 'Password or email is incorrect.' };
    }

    const token = await generateToken(user.id);

    res.json({
      user,
      tokenType: 'Bearer',
      accessToken: token,
    });
  } catch (error) {
    httpError(res, error);
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const salt = bcrypt.genSaltSync();
    const passwordCrypt = bcrypt.hashSync(password, salt);

    let user = new User({ name, email, password });
    user.password = passwordCrypt;
    user = await user.save();

    const token = await generateToken(user.id);

    res.json({
      msg: 'User created successfully.',
      user,
      tokenType: 'Bearer',
      accessToken: token,
    });
  } catch (error) {
    httpError(res, error);
  }
};

export const renovateToken = async (req: Request, res: Response) => {
  const token = await generateToken(req.userLogged.id);

  res.json({
    tokenType: 'Bearer',
    accessToken: token,
  });
};
