import { Request, Response } from'express';
import mongoose  = require('mongoose');
import Friends, {IFriends} from'../models/friends.model';
import User from '../models/usuario.models';

export const testFriends = (req: Request, res: Response) => {
    res.status(200).send({message: 'hello from tests'})
}   

//add friends
export const saveFriends = async (req: Request, res: Response) => {
    const data = req.body;
    const friends = new Friends();

    let userIdLog = new mongoose.Types.ObjectId(req.userId);
    let userIdFriend = new mongoose.Types.ObjectId(data.friend);

    friends.user = userIdLog;
    friends.friends = userIdFriend;

    try {
        const friendsSave = await friends.save();
        if(!friendsSave){
            return res.status(404).send({ message: 'no se gusrdo ningun dato'})
        }
        return res.status(200).send({ friends: friendsSave});
    } catch (err: any) {
        return res.status(500).send({message: err.message})
    }
}

//delete friends
export const deleteFriends = async (req: Request, res: Response) => {
    const userId = req.userId;
    const friendId = req.params.id;

    try{
        const friendDelete = await Friends.deleteOne({'user': userId, 'friends': friendId});
        console.log(friendDelete);
        if(friendDelete == undefined) {
            return res.status(404).send({message: 'user dnot friend'})
        }
        return res.status(200).send({message: 'the friend has been eliminated'});
    } catch(err:any) {
        res.status(500).send({message: [err.message, " ==> erroe in the delete"]});
    }
}

//paginate friends 
export const paginateFriends = async (req: Request, res: Response) => {
    let userId = req.userId.id; 
    let data = req.params;

    if(req.params.id) { 
        userId = req.params.id;
        console.log('viene un dato por parametro ==> ')
    }

    let pag: number = 1;
    if(req.params.pag){
        pag = +req.params.pag;
    }

    let limit: number = 3; //items per page
    console.log(req.userId);
    try{
        const friendPaginate = await Friends.paginate({user: userId},{sort: '_id', limit: limit, page: pag, populate: {path: 'friends'}});
        //const friendPaginate = await Friends.find({user: userId}).populate({path: 'friends'});

        if(!friendPaginate) return res.status(401).send({message: 'no friends added'});

        return res.status(200).send({friends: friendPaginate});
    } catch(err: any){
        return res.status(500).send({message: [err.message, "error in the paginate"]});
    }
    

    

}