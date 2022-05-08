import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ALL_PATHS_REGEX, COMMA } from '@common/constant';
import helmet from 'helmet';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        cors: {
            origin: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(COMMA) : ALL_PATHS_REGEX,
        },
    });
    app.use(helmet());
    await app.listen(process.env.SERVER_PORT);
}
bootstrap();
