import { check } from 'express-validator';

import { validateResult } from '../generals/handleResponse';

export const validateCreate = [
  check('title').exists().not().isEmpty(),
  check('notes').isString(),
  // check('start').exists().not().isEmpty().isISO8601().toDate(),
  check('start').exists().not().isEmpty().toDate(),
  check('end').exists().not().isEmpty().toDate(),
  validateResult,
];

export const validateUpdate = [
  check('id').isMongoId(),
  validateResult,
  check('title').exists().not().isEmpty(),
  check('notes').isString(),
  check('start').exists().not().isEmpty().toDate(),
  check('end').exists().not().isEmpty().toDate(),
  validateResult,
];

export const validateDelete = [check('id').isMongoId(), validateResult];
