import { Response } from 'express';
import jwt from 'jsonwebtoken';
import { AUTH_ACCESS_TOKEN_KEY, AUTH_ACCESS_TOKEN_SECRET } from '../../configs/auth.config';
import { logger } from '../../logger';
import { getUserProfile } from '../user/userProfile.helper';
import { LoginDto } from './auth.dto';
import { isCredentialsValid } from './authLogin.helper';

export async function authLogin(res: Response, dto: LoginDto) {
  try {
    const credentialsValid = await isCredentialsValid(dto);

    if (!credentialsValid) {
      throw Error('Invalid credentials');
    }

    const userProfile = await getUserProfile(dto.username);

    if (!userProfile) {
      throw Error('Unable to find user');
    }

    const accessToken = jwt.sign(
      { sub: userProfile.username },
      AUTH_ACCESS_TOKEN_SECRET,
      { expiresIn: '1h' },
    );

    res
      .cookie(AUTH_ACCESS_TOKEN_KEY, accessToken, {
        httpOnly: true,
        secure: true,
        maxAge: 60 * 60 * 1000,
      });

    res
      .status(200)
      .json(userProfile);
  } catch(e) {
    logger.error(e);

    res
      .status(401)
      .json({ message: 'Invalid username or password' });
  }
}
