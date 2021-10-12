//comprobar si el token es correco y validar secional
//estrategia para crear metodo de autenticacion para

import {Strategy, ExtractJwt, StrategyOptions} from 'passport-jwt'
import config from '../config/config';
import User from '../models/usuario.models';

const opts: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //Va a extraer el token desde el headers luego busca el Bear y extrae el token 
    secretOrKey: config.jwtSecret
};


export default new Strategy(opts, (payload, done) => {
    try {
        const user = User.findById(payload.id);
        if(user){
            return done(null, user);
        }
    return done(null, false);
    } catch (error) {
        console.log(error);
    }
})