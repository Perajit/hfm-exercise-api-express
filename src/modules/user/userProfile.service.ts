import { Response } from 'express';
import { logger } from '../../logger';
import { getUserProfile } from './userProfile.helper';

export async function userProfileQuery(res: Response, username: string) {
  try {
    const userProfile = await getUserProfile(username);

    res
      .status(200)
      .json(userProfile);
  } catch(e) {
    logger.error(e);

    res
      .status(500)
      .json({ message: 'Unknown error' });
  }
}
