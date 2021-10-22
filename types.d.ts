declare namespace Express {
  export interface Request {
    userId;
    tenant?: string;
  }
}
interface MulterRequest extends Request {
  file: any;
}
