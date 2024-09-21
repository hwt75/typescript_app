
import { Injectable } from '@nestjs/common';
import { AccountModel } from '../account/model/account.model';
import { AccountService } from '../account/account.service';
import { UserModel } from '../user/model/user.model';
import { TokenModel } from '../token/model/token.model';
import { UserService } from '../user/user.service';
import { TokenService } from '../token/token.service';
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

@Injectable()
export class AuthenService {
    constructor(
        private accountService: AccountService,
        private userService: UserService,
        private tokenService: TokenService
    ){}

    async register(data: any): Promise<{metaData: any}>{
        try {
            const account = AccountModel.build({
                id: uuidv4(),
                email: data.email,
                password: await bcrypt.hash(data.password, 10)
            });
    
            const user = UserModel.build({
                id: uuidv4(),
                account_id: account.id,
                status: 1,
                username: data.username,
                gender: data.gender,
                phone_number: data.phone_number,
                information: data.information, 
                role: data.role,
            });

            await this.accountService.add(account);
            await this.userService.add(user);
    
            return {
                metaData: {
                    message: "Register success",
                    account: account,
                    user: user
                }
            }
        }
        catch(error){
            console.log("authen.service.register error ", error);
            return {
                metaData: "register failed"
            }
        }
    }

    async login(account: AccountModel): Promise<{token: TokenModel} >{
        try {
            const profile = await this.accountService.findByEmail(account.email);
            const accessToken = await this.tokenService.renderToken(account, 10);
            const refreshToken = await this.tokenService.renderToken(account, 20);

            const token = TokenModel.build({
                id: uuidv4(),
                account_id: profile.id,
                access_token: accessToken,
                refresh_token: refreshToken,
                expires_at: Date.now()
            })
            await this.tokenService.addToDb(token);
            
            return {
                token: token
            };
        }
        catch(error){
            console.log("authen.service.login error ", error);
        }
        return null;
    }

    // async refreshToken()
}