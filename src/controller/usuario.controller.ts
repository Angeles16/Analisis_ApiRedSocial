import {Request, Response} from 'express';
import User, {IUser} from '../models/usuario.models';
import config from '../config/config';
import jwt = require('../service/jwt');
import { removeFile } from'../service/deleteFile'


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
        return res.status(200).json({token: jwt.createToken(user)})
    }   
    return res.status(400).json({mensaje: 'the email or password are incorrect'});
}

//pruebas
export const consulta = async (req: Request, res: Response) => {
    const user = await User.find();
    return res.status(200).json({user});
}

//get user spesific data
export const getUser = (req: Request, res: Response) => {
    let userId = req.params.id;

    User.findById(userId, (err: any, user: any) => {
        if(err) return res.status(500).send({mensaje: "query Error"});
        if(!user) return res.status(404).send({mensaje: "User not exist"});

        return res.status(200).send({ user })
    });
}

//get registred user data token
export const getUserLog = async (req: Request, res: Response) => {
    const id = req.userId;

    User.findById(id, {password: 0},(err: any, user: any) => {
        if(err) return res.status(500).send({mensaje: 'Error query'})
        if(!user) return res.status(401).send({mensaje: 'User not found'});

        return res.status(200).send({user});
    });
};

//get user paginate
export const getUsersPag = async (req: Request, res: Response) => {
    const identity_user = req.userId;
    let page: number = 1;
    if(req.params.page){
        page = +req.params.page;
    }

    let itemPag: number = 3;

    const usersPag = await User.paginate({}, {sort: '_id', limit: itemPag, page: page});

    if(usersPag.error) return res.status(500).send({message: 'Query error'});
    if(!usersPag) return res.status(404).send({message: 'no user available'});

    res.json(usersPag);

}

//update user data
export const updateUserData = (req: Request, res: Response) => {
    const idPar = req.params.id;
    const updateData = req.body;

    //eliminar la propiedad password de los datos obtenidos del req.body
    delete updateData.password;

    if(idPar != req.userId){
        return res.status(500).send({message: 'you do not permission to update user'});
    }

    User.findByIdAndUpdate(idPar, updateData, {new: true}, (err: any, user: any) => {
        if(err) return res.status(500).send({message: [err.message, 'query error update']});
        if(!user) return res.status(404).send({message: 'user could not be updated'});

        return res.status(200).send({user: user});
    });
}

//upload image user
export const uploadImgUser = async (req: Request, res: Response) => {
    const idPar = req.params.id;    

    if(req.file){
        let file_path = req.file?.path;
        console.log(file_path)
        let file_split_path = file_path.split('\\');    
        let file_name = file_split_path[9];
        let file_name_split = file_name.split('.');
        let file_ext = file_name_split[1];
        console.log(file_ext);

        if(idPar != req.userId){
            console.log('entre a la validacion por que el usuario no es valido')
            removeFile(res, file_path, 'yoy do not have persmission to upload img in user')
        }
        
        if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'jpeg'){
            //update logger user document

        } else {
            //delete file.img of upload 
            removeFile(res, file_path, 'Archivo no valido - extencion')
        }


    } else {
        return res.status(403).send({message: 'there is no image in the file'})
    }
    return res.status(200).send({message: 'image upload'})
}