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

//sifrar la contraseña antes de guardarla
userSchema.pre<IUser>('save', async function (next) {
    const user = this;
    if(!user.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10); //generar el salt de 10 interaciones en el algoritmo 
    const hash = await bcrypt.hash(user.password, salt); //aplicar a la contraseña el algoritmo de salt para hashear la contraseña
    user.password = hash;   //gurdar la contaseña encriptada en el usuario
    next();
});

//comprobar si la ocntraseña ingresada coincide con las ocntraseña gurdada
userSchema.methods.compparaPassword = async function(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password)
    //password => hacer referencia a la contraseña pasada como parametro 
    //this.pssword => hacer referencia a la contraseña almacenada en la base de datos ==/ usuario actual
}

export default model<IUser>('User', userSchema)