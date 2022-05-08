import { AuthService } from '@auth/auth.service';
import { Public } from '@auth/decorator/public.decorator';
import { Roles } from '@auth/decorator/roles.decorator';
import { LocalAuthGuard } from '@auth/guard/local-auth.guard';
import { Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { Role } from '@user/user.dto';
import { Request as Req } from 'express';

@Controller()
export class AppController {
    constructor(private readonly authService: AuthService) {}

    @Post('/auth/login')
    @Public()
    @UseGuards(LocalAuthGuard)
    @HttpCode(HttpStatus.OK)
    login(@Request() req: Req) {
        // After the request (constain username, password) is authenticated by LocalAuthGuard => generate JWT
        return this.authService.generateJwt(req.user);
    }

    //any role can access, just need a valid JWT
    @Get('profile')
    getProfile(@Request() req: Req) {
        return req.user;
    }

    //only admin can access
    @Get('admin')
    @Roles(Role.ADMIN)
    onlyAdmin() {
        return 'Hi admin!';
    }

    //only user can access
    @Get('user')
    @Roles(Role.USER)
    onlyUser() {
        return 'Hi user!';
    }

    //admin or user can access
    @Get('adminOrUser')
    @Roles(Role.ADMIN, Role.USER)
    adminOrUser() {
        return 'Hi there!';
    }
}
