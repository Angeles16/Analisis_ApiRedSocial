import { Router } from 'express';

const router = Router();

import { verificarToken } from '../middlewares/passport' ;

import {
    pruebaPost
} from '../controller/post.controller';

router.get('/', pruebaPost);

export default router;