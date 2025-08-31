import Joi from 'joi';
import { Country } from '../../enums/country.enum';
import { Experience } from '../../enums/experience.enum';
import { logger } from '../../logger';
import { UserRegisterDto } from './user.dto';
import { userProfileList } from './userProfile.helper';

const validationPatterns = {
  email: new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$'),
  numeric: new RegExp('^\\d+$'),
  noSpecialCharacter: new RegExp('^[^~`!@#$%^&*()_\\-\\+={}\\[\\]|\\\\:;”‘"\'<>,.?/]+$'),
};

const registerSchema = Joi.object<UserRegisterDto>({
  firstName: Joi.string()
    .regex(validationPatterns.noSpecialCharacter)
    .required(),
  lastName: Joi.string()
    .regex(validationPatterns.noSpecialCharacter)
    .required(),
  countryCode: Joi.string()
    .valid(...Object.values(Country))
    .required(),
  phoneNumber: Joi.string()
    .regex(validationPatterns.numeric)
    .min(3)
    .max(20)
    .required(),
  email: Joi.string()
    .regex(validationPatterns.email)
    .required(),
  experience: Joi.string()
    .valid(...Object.values(Experience))
    .required(),
});

export function validateRegisterDtoSchema(dto: UserRegisterDto): Joi.ValidationResult<UserRegisterDto> {
  return registerSchema.validate(dto);
}

export async function isEmailDuplicated(email: string): Promise<boolean> {
  const duplicated = userProfileList.findIndex((accountInfo) => accountInfo.username === email) > -1;

  return duplicated;
}

export async function handleRegistration(dto: UserRegisterDto): Promise<void> {
  // Do something to register user
  logger.info(dto);
}
