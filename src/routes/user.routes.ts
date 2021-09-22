import express from 'express';
const router = express.Router();

import { signUp, signIg } from '../controller/user.controller';

router.post('/signup', signUp);//ruta registrar un nuevo usuario
router.post('/signin', signIg);//ruta Logear un usuario

export default router;
