import { Router } from'express';
const router = Router();

import { verificarToken } from '../middlewares/passport' 

import {
    testFriends,
    saveFriends,
    deleteFriends,
    paginateFriends
} from'../controller/friends.controller';

router.get('/testfriends', testFriends);
router.post('/newfriend', verificarToken, saveFriends)
router.delete('/deletefriend/:id', verificarToken, deleteFriends);
router.get('/getfriendsPag/:id?/:pag?', verificarToken, paginateFriends)


export default router;