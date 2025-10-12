declare namespace Express {
  export interface Request {
    user: { _uuid: string };
  }
}
