declare namespace Express {
  export interface Request {
    userId: string;
    tenant?: string;
  }
}
interface MulterRequest extends Request {
  file: any;
}
