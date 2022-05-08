import { JwtAuthGuard } from '@auth/guard/jwt-auth.guard';
import { RoleGuard } from '@auth/guard/roles.guard';
import { Logger, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { UserModule } from './user/user.module';
import { ALL_PATHS_REGEX } from '@common/constant';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        AuthModule,
        UserModule,
    ],
    controllers: [AppController],
    providers: [{ provide: APP_GUARD, useClass: JwtAuthGuard }, { provide: APP_GUARD, useClass: RoleGuard }, Logger],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes({ path: ALL_PATHS_REGEX, method: RequestMethod.ALL });
    }
}
