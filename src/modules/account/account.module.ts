import { AccountRepository } from './model/account.repository';
import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { AccountService } from './account.service';
import { AccountModel } from './model/account.model';

@Module({
    imports: [
        SequelizeModule.forFeature([AccountModel])
    ],
    controllers: [AccountController],
    providers: [AccountService, AccountRepository],
    exports: [AccountService]
})

export class AccountModule {}