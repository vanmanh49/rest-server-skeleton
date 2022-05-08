import { Injectable } from '@nestjs/common';
import { DUMMY_USERS } from './dummy-users';

@Injectable()
export class DummyUserRepository {
    async findAll() {
        return DUMMY_USERS;
    }
}
