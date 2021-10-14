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
        return res.status(400).json({mensaje: 'the password or email are incorrect'});
    }

    const isMatch = await user?.comparePassword(req.body.password);
    if(isMatch) {
        //res.status(200).json({mensaje: 'The user set create token'});
        const tokenuse = jwt.createToken(user);
        
        //this.User = tokenuse;
        req.user = user;
        console.log('Token ===> ' + user._id);
        return res.status(200).json({token: jwt.createToken(user)})
    }
    
    return res.status(400).json({mensaje: 'the email or password are incorrect'});
}



//pruebas
export const consulta = async (req: Request, res: Response) => {
    const user = await User.find();
    User.db.collection('usuarios').find();
    return res.status(200).json({user});
}

//get data user
export const getUser = (req: Request, res: Response) => {
    let userId = req.params.id;

    User.findById(userId, (err: any, user: any) => {
        if(err) return res.status(500).send({mensaje: "query Error"});
        if(!user) return res.status(404).send({mensaje: "User not exist"});

        return res.status(200).send({ user })
    });
}

//get data users pagination
export const getUserLog = (req: Request, res: Response) => {
    //req.user
}