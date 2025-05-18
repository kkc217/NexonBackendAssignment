import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '../../auth/jwt.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtValidator: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const auth = request.headers.authorization;
    if (!auth?.startsWith('Bearer '))
      throw new UnauthorizedException('Missing token.');

    const accessToken = auth.slice(7);
    try {
      request.user = await this.jwtValidator.validate(accessToken);
      return true;
    } catch {
      throw new UnauthorizedException('Invalid token.');
    }
  }
}
