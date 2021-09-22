import { model, Schema, Document} from 'mongoose';
import bcrypt = require('bcrypt');

export interface IUser extends Document{
    nombre: string, 
    apellido: string, 
    nick: string, 
    email: string, 
    password: string, 
    roles: string, 
    imagenes: string
}

const userSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    nick: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    roles: {
        type: String,
    },
    imagenes: {
        type: String
    }
});

userSchema.pre<IUser>('save', async function (next) {
    const user = this;
    if(!user.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    next();
});

export default model<IUser>('User', userSchema)