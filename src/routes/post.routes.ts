import express from 'express';
const router = express.Router();

import passport from 'passport';

router.get('/post', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.send('validation success');
})

export default router;