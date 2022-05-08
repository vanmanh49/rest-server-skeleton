import { registerAs } from '@nestjs/config';

export const JWT_CONFIG_KEY = 'jwt';

export interface JwtConfig {
    secretKey: string;
    expirationPeriod: string;
}

export default registerAs(
    JWT_CONFIG_KEY,
    (): JwtConfig => ({
        secretKey: process.env.JWT_SECRET_KEY,
        expirationPeriod: process.env.JWT_EXPIRATION_PERIOD,
    }),
);
