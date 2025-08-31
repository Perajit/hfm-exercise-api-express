import { LoginDto } from './auth.dto';

type AuthCredentials = {
  username: string;
  passwordHash: string;
};

export const authCredentialsList: AuthCredentials[] = [
  { username: 'user1@mail.com', passwordHash: 'P@ssword1' },
  { username: 'user2@mail.com', passwordHash: 'P@ssword2' },
];

export async function isCredentialsValid(dto: LoginDto): Promise<boolean> {
  const { username: userName, password } = dto;
  const refUserCredentials = authCredentialsList.find(credentials => credentials.username === userName);

  if (refUserCredentials) {
    const expectedHashPassword = refUserCredentials.passwordHash;
    const inputHashPassword = password; // TODO: Hash by bcrypt

    return inputHashPassword === expectedHashPassword;
  }

  return false;
}
