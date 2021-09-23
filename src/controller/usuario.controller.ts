import {Request, Response} from 'express';
import User, {IUser} from '../models/usuario.models';


export const signUp = async (req: Request, res: Response): Promise<Response> => {
    if(!req.body.nombre || !req.body.apellido || !req.body.nick || !req.body.email || !req.body.password) {
        return res.status(400).json({mensaje: 'Please. write your data'})
    }
    //console.log(req.body.email);
    //comprobar si no existe el correo 
    const user = await User.findOne({email: req.body.email});
    console.log(user);
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
    const user = await User.findOne({email: req.body.email});
    if(!user) {
        res.status(400).json({mensaje: 'The user does not exist'});
    }

    const isMatch = await user?.comparePassword(req.body.password);
    if(isMatch) {

    }

}



//pruebas
export const consulta = async (req: Request, res: Response) => {
    const user = await User.find();
    User.db.collection('usuarios').find();
    return res.status(200).json({user});
}