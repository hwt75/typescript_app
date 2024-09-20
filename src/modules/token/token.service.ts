import { Injectable } from '@nestjs/common';
import { AccountModel } from '../account/model/account.model';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
    constructor(
        private jwtService: JwtService
    ){}

    async renderToken(account: AccountModel, expiredTime: number) {
        try{
            this.jwtService.sign({
                account_id: account.id,
            },{
                secret: process.env.JWT_SECRET,
                expiresIn: expiredTime
            })
        }
        catch(error){
            console.log("token.service.renderToken failed ", error)
            return false;
        }
    }

    async verifyToken(token: string): Promise<any> {
        try {
            const decoded = await this.jwtService.verifyAsync(token, {
                secret: process.env.JWT_SECRET,
            });
            return decoded;
        } catch (error) {
            console.log("token.service.verifyTokn failed ", error)
            return false;
        }
    }
}