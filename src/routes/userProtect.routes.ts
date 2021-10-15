import express from 'express';
const router = express.Router();

import {getUser, getUserLog} from '../controller/usuario.controller';
import passport from 'passport';

import { verificarToken } from '../middlewares/passport';


router.get('/protect', verificarToken, (req, res) => {
    res.send('validation success');
})

//get user
router.get('/userlog', verificarToken, getUserLog)
router.get('/user/:id', verificarToken, getUser)
export default router;