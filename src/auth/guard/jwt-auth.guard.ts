import { IS_PUBLIC_KEY } from '@auth/decorator/public.decorator';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(private readonly refletor: Reflector) {
        super();
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const isPublic = this.refletor.getAllAndOverride(IS_PUBLIC_KEY, [context.getHandler(), context.getClass()]);
        if (isPublic) return true;
        return super.canActivate(context);
    }
}
