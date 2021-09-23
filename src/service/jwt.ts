import User, {IUser} from '../models/usuario.models';
import jwt from 'jsonwebtoken';
import config from '../config/config';
import moment from 'moment';

export function createToken(user: IUser){
    const payload = {
        id: user.id,
        email: user.email,
        nick: user.nick,
        iat: moment().unix(),//Fecha de creacion del token 
        exp: moment().add(30, 'days').unix() //Fecha de expiracion del token
    };

    return jwt.sign(payload, config.jwtSecret);
}