declare namespace Express {
  export interface Request {
    userId: string;
  }
}
interface MulterRequest extends Request {
  file: any;
}