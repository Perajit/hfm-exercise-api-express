import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { AUTH_ACCESS_TOKEN_KEY, AUTH_ACCESS_TOKEN_SECRET } from '../../configs/auth.config';
import { logger } from '../../logger';

export type AuthRequest = Request & {
  username?: string;
};

export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
  const accessToken = req.cookies[AUTH_ACCESS_TOKEN_KEY];

  if (!accessToken) {
    return res
      .status(401)
      .json({ message: 'No token' });
  }

  try {
    const payload = jwt.verify(accessToken, AUTH_ACCESS_TOKEN_SECRET);
    req.username = payload.sub as string;

    next();
  } catch(e) {
    logger.error(e);

    return res
      .status(401)
      .json({ message: 'Invalid or expired token' });
  }
}
