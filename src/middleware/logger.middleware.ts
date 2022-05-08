import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    constructor(private readonly logger: Logger) {}

    use(req: Request, res: Response, next: NextFunction) {
        this.logger.debug(`[LoggerMiddleware] ${req.ip} ${req.method} ${req.originalUrl}`);
        next();
    }
}
