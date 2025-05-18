import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { JWTVerifyResult } from 'jose';

@Injectable()
export class JwtService {
  private jwks: ReturnType<any>;
  private jwksReady = false;

  constructor(private readonly configService: ConfigService) {}

  private async getJwks() {
    if (!this.jwksReady) {
      const { createRemoteJWKSet } = await import('jose');
      const uri = this.configService.get<string>(
        'JWKS_URI',
        'http://auth-server:4001/auth/jwks',
      );

      this.jwks = createRemoteJWKSet(new URL(uri));
      this.jwksReady = true;
    }

    return this.jwks;
  }

  async validate(accessToken: string): Promise<JWTVerifyResult['payload']> {
    const { jwtVerify } = await import('jose');

    const jwks = await this.getJwks();
    const { payload } = await jwtVerify(accessToken, jwks);

    return payload;
  }
}
