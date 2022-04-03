import { check } from 'express-validator';

import { validateResult } from '../generals/handleResponse';
import { isEquals } from '../../helpers/jwtValidateHelper';
import { existEmail } from '../../helpers/db/userDbHelpers';

export const validateLogin = [check('email').isEmail(), check('password').exists(), validateResult];

export const validateRegister = [
  check('name').exists().not().isEmpty().isLength({ min: 4 }),
  check('email').exists().isEmail().custom(existEmail),
  check('password', 'Password required.')
    .exists()
    .isLength({ min: 8 })
    .custom((val, { req }) => isEquals(val, req.body.password_confirm))
    .withMessage('Las contraseñas no coinciden.'),
  check('password_confirm').exists().not().isEmpty(),
  validateResult,
];
