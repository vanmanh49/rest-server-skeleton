import { Role, User } from '@user/user.dto';

export const DUMMY_USERS: User[] = [
    {
        userId: 1,
        username: 'admin',
        password: 'admin',
        roles: [Role.ADMIN],
    },
    {
        userId: 2,
        username: 'user',
        password: 'user',
        roles: [Role.USER],
    },
];
