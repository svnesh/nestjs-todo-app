import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor (
        private jwtService: JwtService,
        private configService: ConfigService,
    ){}

    async canActivate(context: ExecutionContext): Promise<boolean>{

        const request: Request | any = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token){
            throw new UnauthorizedException();
        }

        try{
            const payload = await this.jwtService.verifyAsync(token, {
                secret: this.configService.get("JWT_SECRET")
            });

            request['user'] = payload;

        }catch{
            throw new UnauthorizedException();
        }
        return true;
    }



    private extractTokenFromHeader(request: Request | any): string | undefined{
        const [type,token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}