import { Router } from 'express';

import { login, register, renovateToken } from '../../controllers/AuthController';
import { validateJWT } from '../../middlewares/generals/jwtValidator';
import { validateLogin, validateRegister } from '../../middlewares/validators/authValidator';

const router = Router();

// POST api/v1/auth/login
router.post('/login', validateLogin, login);

// POST api/v1/auth/register
router.post('/register', validateRegister, register);

// GET api/v1/auth/renovate-token
router.get('/renovate-token', validateJWT, renovateToken);

export default router;
