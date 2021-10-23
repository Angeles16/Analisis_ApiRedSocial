import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import moment from 'moment';

import Publication from '../models/publication.model';
import User from '../models/usuario.models';
import Friends from '../models/friends.model';

export const pruebaPost = (req: Request, res: Response) => {
    res.status(200).send({message: 'hello from controller post'})
}