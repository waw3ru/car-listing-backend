import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { BasicStrategy } from 'passport-http';

@Injectable()
export class BasicAuthGuard extends PassportStrategy(BasicStrategy) {
  constructor(private configService: ConfigService) {
    super();
  }

  validate(user: string, password: string) {
    const sysUser = this.configService.get('SYS_USER');
    const sysPass = this.configService.get('SYS_PASS');

    const isAuth = sysUser === user && sysPass === password;
    if (!isAuth) throw new UnauthorizedException();
    return true;
  }
}
