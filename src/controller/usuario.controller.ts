import {Request, Response} from 'express';
import User, {IUser} from '../models/usuario.models';
//import jwt from 'jsonwebtoken';
import config from '../config/config';
import jwt = require('../service/jwt');
import moment from 'moment';


/* -------------CREATE TOKEN------------- 
function createToken(user: IUser){
    const payload = {
        id: user.id,
        email: user.email,
        nick: user.nick,
        iat: moment().unix(),//Fecha de creacion del token 
        exp: moment().add(30, 'days').unix() //Fecha de expiracion del token
    };

    return jwt.sign(payload, config.jwtSecret);
} 
 -------------FIN CREATE TOKEN------------- */

export const signUp = async (req: Request, res: Response): Promise<Response> => {
    if(!req.body.nombre || !req.body.apellido || !req.body.nick || !req.body.email || !req.body.password) {
        return res.status(400).json({mensaje: 'Please. write your data'})
    }
    //console.log(req.body.email);
    //comprobar si no existe el correo 
    const user = await User.findOne({email: req.body.email});
    if(user){
        return res.status(400).json({mensaje: 'The user already exist'});
    }

    const newUser = new User(req.body);
    console.log(newUser);
    newUser.save();
    return res.status(200).json({newUser});
}



export const signIg = async (req: Request, res: Response) => {
    if(!req.body.email || !req.body.password) {
        res.status(400).json({mensaje: 'please enter your data'});
    }
    //Consultar data user: any
    const user: any = await User.findOne({email: req.body.email});
    console.log('test content user ==> ' + user)
    if(!user) {
        return res.status(400).json({mensaje: 'The user does not exist'});
    }

    const isMatch = await user?.comparePassword(req.body.password);
    if(isMatch) {
        //res.status(200).json({mensaje: 'The user set create token'});
        return res.status(200).json({token: jwt.createToken(user)})
    }

    return res.status(400).json({mensaje: 'the email and password are incorrect'});
}



//pruebas
export const consulta = async (req: Request, res: Response) => {
    const user = await User.find();
    User.db.collection('usuarios').find();
    return res.status(200).json({user});
}