import { Response } from 'express';
import { AUTH_ACCESS_TOKEN_KEY } from '../../configs/auth.config';

export async function authLogout(res: Response) {
  res.clearCookie(AUTH_ACCESS_TOKEN_KEY);
  res.json({ message: 'Logged out' });
}
