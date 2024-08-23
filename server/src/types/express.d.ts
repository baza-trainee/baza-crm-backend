declare namespace Express {
  export interface Request {
    user: any;
    getUserId: () => number;
    isAdmin: () => boolean;
  }
}
