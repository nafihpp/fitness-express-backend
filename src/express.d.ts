// express.d.ts
import { IUser } from './model/user/types';

// Extend the Request interface to include 'user' property
declare global {
  namespace Express {
    interface Request {
      user?: IUser; 
    }
  }
}
