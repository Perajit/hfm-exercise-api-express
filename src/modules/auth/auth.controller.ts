import { Request, Response } from 'express';
import { authLogin } from './authLogin.service';
import { authLogout } from './authLogout.service';

export function login(req: Request, res: Response) {
  const dto = req.body;

  authLogin(res, dto);
}

export function logout(_: Request, res: Response) {
  authLogout(res);
}
