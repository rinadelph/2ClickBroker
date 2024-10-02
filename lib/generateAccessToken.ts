import { randomBytes } from 'crypto';

export function generateAccessToken(): string {
  const tokenLength = 32; // Adjust the token length as needed
  const tokenBytes = randomBytes(tokenLength);
  const token = tokenBytes.toString('hex');
  return token;
}