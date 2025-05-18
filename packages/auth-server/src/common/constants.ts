import * as path from 'path';

export const JWT_KEYS_PATH = path.resolve(__dirname, '../../keys');
export const JWT_PRIVATE_KEY_PATH = path.join(JWT_KEYS_PATH, 'private.pem');
export const JWT_PUBLIC_KEY_PATH = path.join(JWT_KEYS_PATH, 'public.pem');
export const JWT_ALGORITHM = 'RS256';
export const JWT_EXPIRES_IN = '1h';
