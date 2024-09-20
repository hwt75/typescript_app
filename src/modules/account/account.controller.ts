import { Controller, Get, Post, Body } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountModel } from './model/account.model';

@Controller("accounts")
export class AccountController {
    constructor(
        private accountService: AccountService
    ){}

    @Get('')
    async findAll(){
        return await this.accountService.findAll();
    }

    @Post('register')
    async add(@Body() account: AccountModel){
        return await this.accountService.add(account);
    }

}