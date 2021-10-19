import express from 'express';
const router = express.Router();
import { verificarToken } from '../middlewares/passport';
const uploadUser = require('../middlewares/multer');

import {
    getUser, 
    getUserLog, 
    getUsersPag, 
    updateUserData,
    uploadImgUser
} from '../controller/usuario.controller';


router.get('/protect', verificarToken, (req, res) => {
    res.send('validation success');
})

//get user
router.get('/userlog', verificarToken, getUserLog);
router.get('/getuserspag/:page?', verificarToken, getUsersPag);
router.put('/updateuserdata/:id', verificarToken, updateUserData);
router.post('/uploaduserimg/:id', [verificarToken, uploadUser], uploadImgUser);
router.get('/user/:id', verificarToken, getUser);
export default router;