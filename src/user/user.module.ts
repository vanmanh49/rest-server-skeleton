import { Module } from '@nestjs/common';
import { DummyUserRepository } from './dummy-data/dummy-user.repository';
import { UserService } from './user.service';

@Module({
    providers: [UserService, DummyUserRepository],
    exports: [UserService],
})
export class UserModule {}
