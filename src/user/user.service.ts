import { Injectable } from '@nestjs/common';
import { DummyUserRepository } from './dummy-data/dummy-user.repository';
import { User } from './user.dto';

@Injectable()
export class UserService {
    constructor(private readonly dummyUserRepository: DummyUserRepository) {}

    async findOne(username: string): Promise<User | undefined> {
        const users = await this.dummyUserRepository.findAll();
        return users.find((u) => u.username === username);
    }
}
