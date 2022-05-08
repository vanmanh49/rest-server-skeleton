import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@user/user.dto';
import { UserService } from '@user/user.service';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

    async validateUser(username: string, password: string): Promise<Partial<User> | null> {
        const user = await this.userService.findOne(username);
        if (!user) return null;
        if (user.password === password) {
            const { password, ...restProps } = user;
            return restProps;
        }
        return null;
    }

    async generateJwt(user: Partial<User>) {
        const payload = {
            username: user.username,
            sub: user.userId,
            roles: user.roles,
        };
        return { jwt: this.jwtService.sign(payload) };
    }
}
