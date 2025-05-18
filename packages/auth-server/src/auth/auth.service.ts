import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { createHash } from 'crypto';
import * as fs from 'fs';

import { LoginResponseDto } from './dtos/response/login-response.dto';

import { JWT_PUBLIC_KEY_PATH } from '../common/constants';
import { User } from '../user/schema/user.schema';

@Injectable()
export class AuthService {
  private CACHED_JWK;

  constructor(private readonly jwtService: JwtService) {}

  async getJwks() {
    if (this.CACHED_JWK) return this.CACHED_JWK;

    const pem = fs.readFileSync(JWT_PUBLIC_KEY_PATH, 'utf-8');
    const { importSPKI, exportJWK } = await import('jose');
    const key = await importSPKI(pem, 'RS256');

    this.CACHED_JWK = await exportJWK(key);
    this.CACHED_JWK.use = 'sig';
    this.CACHED_JWK.alg = 'RS256';
    this.CACHED_JWK.kid = this.generateKid(this.CACHED_JWK);

    return this.CACHED_JWK;
  }

  async login(user: User, password: string): Promise<LoginResponseDto> {
    if (!(await this.comparePassword(user, password)))
      throw new UnauthorizedException('Invalid loginId or password.');

    const accessToken = await this.createAccessToken(user);
    return { accessToken };
  }

  private generateKid(jwk: JsonWebKey): string {
    const keyString = JSON.stringify({
      kty: jwk.kty,
      n: jwk.n,
      e: jwk.e,
    });
    return createHash('sha256').update(keyString).digest('hex');
  }

  private async comparePassword(
    user: User,
    inputPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(inputPassword, user.password);
  }

  private async createAccessToken(user: User) {
    const jwk = this.CACHED_JWK ?? (await this.getJwks());

    const payload = {
      sub: user._id?.toString(),
      loginId: user.loginId,
      roles: user.roles,
    };

    return this.jwtService.signAsync(payload, {
      algorithm: jwk.alg,
      header: {
        alg: jwk.alg,
        kid: jwk.kid,
      },
    });
  }
}
