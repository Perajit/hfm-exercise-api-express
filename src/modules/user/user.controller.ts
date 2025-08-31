import { Request, Response } from 'express';
import { AuthRequest } from '../auth/auth.middleware';
import { userProfileQuery } from './userProfile.service';
import { userRegister } from './userRegister.service';

export function register(req: Request, res: Response) {
  const dto = req.body;

  userRegister(res, dto);
};

export function profileQuery(req: AuthRequest, res: Response) {
  const username = req.username ?? '';

  userProfileQuery(res, username);
};
