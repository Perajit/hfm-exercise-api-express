import { Country } from '../../enums/country.enum';

export type UserProfile = {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  countryCode: string;
  phoneCode: string;
  phoneNumber: string;
  settings: {
    lang: string;
  };
};


export const userProfileList: UserProfile[] = [
  {
    id: 1,
    username: 'user1@mail.com',
    firstName: 'Peter',
    lastName: 'Parker',
    countryCode: Country.THA,
    phoneCode: '66',
    phoneNumber: '123456789',
    settings: {
      lang: 'EN',
    },
  },
  {
    id: 1,
    username: 'user2@mail.com',
    firstName: 'Marry',
    lastName: 'Jane',
    countryCode: Country.THA,
    phoneCode: '66',
    phoneNumber: '987654321',
    settings: {
      lang: 'EN',
    },
  },
];

export async function getUserProfile(userName: string): Promise<UserProfile | undefined> {
  const userProfile = userProfileList.find(userInfo => userInfo.username === userName);

  return userProfile;
}
