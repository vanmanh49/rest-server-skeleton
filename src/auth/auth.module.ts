import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '@user/user.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import jwtConfig, { JwtConfig, JWT_CONFIG_KEY } from './jwt.config';

@Module({
    imports: [
        ConfigModule.forFeature(jwtConfig),
        PassportModule,
        UserModule,
        JwtModule.registerAsync({
            useFactory: async (configService: ConfigService) => {
                const jwtConfig = configService.get<JwtConfig>(JWT_CONFIG_KEY);
                return {
                    secret: jwtConfig.secretKey,
                    signOptions: {
                        expiresIn: jwtConfig.expirationPeriod,
                    },
                };
            },
            inject: [ConfigService],
        }),
    ],
    providers: [AuthService, LocalStrategy, JwtStrategy],
    exports: [AuthService],
})
export class AuthModule {}
