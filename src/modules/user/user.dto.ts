import { Country } from '../../enums/country.enum';
import { Experience } from '../../enums/experience.enum';

export interface UserRegisterDto {
  firstName: string;
  lastName: string;
  countryCode: Country;
  phoneNumber: string;
  email: string;
  experience: Experience;
}
