import express, {Application} from 'express';
import morgan from 'morgan';
import cors from 'cors';
import passport from 'passport';

import './database';
import userRoutes from './routes/usuario.routes';
import userProtectRoutes from './routes/userProtect.routes';


class Server {
    public app: Application;

    constructor(){
        this.app = express();
        this.settings();
        this.middleware();
        this.router();
        
    }

    settings(): void {
        this.app.set('port', process.env.PORT || 3000);
    }

    middleware(): void {
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.urlencoded({extended:false}));
        this.app.use(express.json());
        
    }

    router(): void {
        this.app.get('/', (req, res) => {
            res.send('this index of social mean, is at localhost:3000');
        });

        
        this.app.use('/api/user',userRoutes);
        this.app.use(userProtectRoutes);
    }

    start(): void {
        this.app.listen(this.app.get('port'), ()=>{
            console.log(`server on port ${this.app.get('port')}`);
        })
    };
};

const server = new Server();
server.start();



