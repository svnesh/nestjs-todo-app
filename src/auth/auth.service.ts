import { Injectable,UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ){}

    async signIn(email: string, pass: string): Promise<any>{

        const user = await this.userService.findUserByEmail(email);

        const validUser = bcrypt.compareSync(pass, user?.password);

        if(!validUser){
            throw new UnauthorizedException();
        }
        const payload = { email:user.email, id:user.id };

        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}
