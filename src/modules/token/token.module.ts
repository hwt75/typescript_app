import { Module } from '@nestjs/common';
import { AccountModule } from '../account/account.module';
import { TokenService } from './token.service';

@Module({
    imports: [AccountModule],
    providers: [TokenService]
})

export class TokenModule {}