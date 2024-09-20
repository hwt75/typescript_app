import { Injectable } from '@nestjs/common';
import { UserRepository } from './model/user.repository';
import { UserModel } from './model/user.model';

@Injectable()
export class UserService {
    constructor(
        private userRepository: UserRepository
    ){}

    async add(user: UserModel) {
        try{
            await this.userRepository.add(user);
        }
        catch(error){
            console.log("account.service.add failed", error);
            return false;
        }
    }
}