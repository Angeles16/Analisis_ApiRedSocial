import express from 'express';
const router = express.Router();

import {getUser} from '../controller/usuario.controller';
import passport from 'passport';

router.get('/protect', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.send('validation success');
})

//get user
router.get('/user/:id', passport.authenticate('jwt', {session: false}), getUser)
export default router;