export interface User extends Express.User {
    userId: number;
    username: string;
    password: string;
    roles: Role[];
}

export enum Role {
    ADMIN = 'admin',
    USER = 'user',
}
