import { Response } from 'express';
import { logger } from '../../logger';
import { UserRegisterDto } from './user.dto';
import { handleRegistration, isEmailDuplicated, validateRegisterDtoSchema } from './userRegister.helper';

export async function userRegister(res: Response, dto: UserRegisterDto) {
  try {
    const { error } = validateRegisterDtoSchema(dto);

    if (error) {
      res
        .status(400)
        .json(error);
    }

    const emailDuplicated = await isEmailDuplicated(dto.email);

    if (emailDuplicated) {
      res
        .status(409)
        .json({ message: 'Email already exists' });
    }

    await handleRegistration(dto);

    res
      .status(200)
      .json({ result: 'Success' });
  } catch (e) {
    logger.error(e);

    res
      .status(500)
      .json({ message: 'Unknown error' });
  }
}
