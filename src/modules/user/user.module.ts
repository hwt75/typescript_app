import { Module } from '@nestjs/common';
import { UsersController } from "./user.controller";
import { UserService } from './user.service';
import { UserRepository } from './model/user.repository';
import { UserModel } from './model/user.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
    imports: [
        SequelizeModule.forFeature([UserModel])
    ],
    controllers: [UsersController],
    providers: [UserService, UserRepository],
    exports: [UserService]
})

export class UserModule {}